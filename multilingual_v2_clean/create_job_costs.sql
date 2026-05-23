-- Lütfen bu SQL kodunu Supabase Dashboard > SQL Editor üzerinden çalıştırın:

CREATE TABLE IF NOT EXISTS job_costs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    job_id UUID REFERENCES generation_jobs(id) ON DELETE CASCADE,
    step_name VARCHAR(50) NOT NULL, -- 'text_generation', 'master_image', 'page_image_N', 'audio_page_N'
    model_name VARCHAR(100) NOT NULL,
    input_tokens INT NOT NULL DEFAULT 0,
    output_tokens INT NOT NULL DEFAULT 0,
    input_cost DECIMAL(10, 6) NOT NULL DEFAULT 0.000000,
    output_cost DECIMAL(10, 6) NOT NULL DEFAULT 0.000000,
    total_cost DECIMAL(10, 6) GENERATED ALWAYS AS (input_cost + output_cost) STORED,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_job_costs_job_id ON job_costs(job_id);
