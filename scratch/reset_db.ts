import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config()

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function reset() {
  console.log('>>> [DB RESET]: Masallar ve İşler siliniyor...')
  
  const { error: storyError } = await supabase.from('stories').delete().neq('id', '00000000-0000-0000-0000-000000000000') // delete all
  if (storyError) {
    console.error('Stories silme hatası:', storyError)
  } else {
    console.log('✅ Tüm masallar silindi.')
  }

  const { error: jobError } = await supabase.from('generation_jobs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (jobError) {
    console.error('Jobs silme hatası:', jobError)
  } else {
    console.log('✅ Tüm işler silindi.')
  }
}

reset()
