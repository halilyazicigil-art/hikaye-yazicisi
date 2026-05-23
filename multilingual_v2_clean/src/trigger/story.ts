import { task, wait } from "@trigger.dev/sdk";
import { createAdminClient } from "../../utils/supabase/server";
import { ApiSlotBroker } from "../../utils/security/ApiSlotBroker";
import { EnterpriseSec } from "../../utils/security/enterprise-sec";

export const generateStoryTask = task({
  id: "hikaye-olusturma",
  queue: {
    name: "story-generation-queue",
    concurrencyLimit: 2, // Exactly 2 parallel jobs!
  },
  maxDuration: 1500, // 25 minutes timeout limit
  run: async (payload: { jobId: string }) => {
    const supabase = await createAdminClient();

    // 1. Acquire Slot (Primary or Backup)
    const slot = await ApiSlotBroker.acquireSlot(supabase, payload.jobId);
    if (!slot) {
      throw new Error(`Could not acquire slot for job ${payload.jobId}`);
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8181";
      const workerUrl = `${baseUrl}/api/story-worker`;
      const authHeaders = EnterpriseSec.getAuthorizationHeaders();

      let isDone = false;
      let attempts = 0;

      while (!isDone) {
        attempts++;
        if (attempts > 50) {
          throw new Error("Story generation exceeded maximum steps limit (50).");
        }

        const response = await fetch(workerUrl, {
          method: "POST",
          headers: {
            ...authHeaders,
            "x-orchestrated-job-id": payload.jobId,
            "x-trigger-orchestrated": "true",
          },
          body: JSON.stringify({ jobId: payload.jobId }),
        });

        if (!response.ok) {
          throw new Error(`Worker HTTP Error: ${response.statusText} (${response.status})`);
        }

        // Fetch current job status from DB to check if completed or failed
        const { data: job, error } = await supabase
          .from("generation_jobs")
          .select("status")
          .eq("id", payload.jobId)
          .single();

        if (error) {
          throw new Error(`Database error fetching job status: ${error.message}`);
        }

        if (job?.status === "completed" || job?.status === "failed" || job?.status === "dismissed") {
          isDone = true;
        } else {
          // Wait 1 second before calling the next step
          await wait.for({ seconds: 1 });
        }
      }
    } finally {
      // 2. Always release the slot
      await ApiSlotBroker.releaseSlot(supabase, payload.jobId);
    }
  },
});
