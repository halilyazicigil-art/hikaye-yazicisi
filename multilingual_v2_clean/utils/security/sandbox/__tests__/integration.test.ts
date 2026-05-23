import { describe, it, expect, beforeEach } from 'vitest';
import { SandboxDatabase, MockApiSlotBroker, MockExternalAPIs, MockJob, MockStory } from '../mockServices';

describe('🔀 LUMIBOOK SANDBOX INTEGRATION TESTS', () => {
  beforeEach(() => {
    SandboxDatabase.reset();
  });

  it('Masal oluşturma döngüsü (Enqueue ➔ Kiralama ➔ Üretim ➔ Tamamlanma) eksiksiz çalışmalıdır', async () => {
    const testJobId = '77777777-7777-7777-7777-777777777777';
    const testUserId = 'user-999';

    // ADIM 1: İş kaydını veritabanına "pending" olarak kuyrukla (Enqueue)
    const newJob: MockJob = {
      id: testJobId,
      user_id: testUserId,
      status: 'pending',
      progress: 0,
      story_id: null,
      payload: {
        hero: 'Astronaut Leo',
        style: 'pixar',
        elevenVoiceId: 'Algenib',
        language: 'en'
      },
      fingerprint: 'astronaut leo|nebula space mushroom',
      scheduled_at: new Date().toISOString(),
      estimated_duration: 120,
      created_at: new Date().toISOString()
    };
    SandboxDatabase.jobs.push(newJob);

    const enqueuedJob = SandboxDatabase.jobs.find(j => j.id === testJobId);
    expect(enqueuedJob).toBeDefined();
    expect(enqueuedJob?.status).toBe('pending');
    expect(enqueuedJob?.progress).toBe(0);

    // ADIM 2: API slotunu kirala
    const leaseResult = await MockApiSlotBroker.acquireSlot(testJobId);
    expect(leaseResult.success).toBe(true);
    expect(leaseResult.slot).toBe('primary');

    // Job durumunu 'processing' yap ve ilerlet
    enqueuedJob!.status = 'processing';
    enqueuedJob!.progress = 10;
    expect(SandboxDatabase.jobs[0].status).toBe('processing');

    // ADIM 3: Metin üretimini simüle et
    const textOutput = await MockExternalAPIs.generateStoryText(enqueuedJob!.payload.hero);
    expect(textOutput.title).toBe('The Magic Lantern');
    enqueuedJob!.progress = 50;

    // ADIM 4: Ses üretimini simüle et
    const audioUrl = await MockExternalAPIs.generateVoice(textOutput.scenes[0].text, enqueuedJob!.payload.elevenVoiceId);
    expect(audioUrl).toContain('mock-audio');
    enqueuedJob!.progress = 90;

    // ADIM 5: Hikayeyi kütüphaneye kaydet
    const completedStory: MockStory = {
      id: 'story-888',
      user_id: testUserId,
      title: textOutput.title,
      content_json: textOutput.scenes,
      image_url: 'https://mock-cdn.lumibook.app/images/mock-pic.png',
      audio_url: audioUrl,
      is_shuffle: true,
      metadata: {
        voice_name: 'Algenib',
        style: 'pixar'
      }
    };
    SandboxDatabase.stories.push(completedStory);
    expect(SandboxDatabase.stories.length).toBe(1);

    // ADIM 6: Slotu serbest bırak ve işi "completed" yap
    const releaseResult = await MockApiSlotBroker.releaseSlot(testJobId);
    expect(releaseResult).toBe(true);

    enqueuedJob!.status = 'completed';
    enqueuedJob!.progress = 100;
    enqueuedJob!.story_id = completedStory.id;

    // Nihai Durum Kontrolü
    const finalJob = SandboxDatabase.jobs.find(j => j.id === testJobId);
    expect(finalJob?.status).toBe('completed');
    expect(finalJob?.progress).toBe(100);
    expect(finalJob?.story_id).toBe('story-888');

    // Yuvaların boşaldığını doğrula
    const primarySlot = SandboxDatabase.slots.find(s => s.slot_name === 'primary');
    expect(primarySlot?.status).toBe('idle');
    expect(primarySlot?.job_id).toBeNull();
  });
});
