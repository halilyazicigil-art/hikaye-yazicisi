const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anxxcbbfhzwpwarywcbv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHhjYmJmaHp3cHdhcnl3Y2J2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM4MjM3MSwiZXhwIjoyMDkyOTU4MzcxfQ.3RepAYMp5CKOnSNarwHkVUhrPyUT2Pp2mNZqu1_Gxek';

const supabase = createClient(supabaseUrl, supabaseKey);

async function diagnose() {
    const { data: jobs, error } = await supabase
        .from('generation_jobs')
        .select('id, payload')
        .eq('status', 'completed')
        .eq('payload->>isShuffle', 'true')
        .limit(10);

    if (error) {
        console.error('Error:', error);
        return;
    }

    console.log('--- Database Themes (First 10 Shuffle Jobs) ---');
    jobs.forEach(j => {
        console.log(`ID: ${j.id} | Theme: "${j.payload.theme}"`);
    });
}

diagnose();
