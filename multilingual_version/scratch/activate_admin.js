const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://anxxcbbfhzwpwarywcbv.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFueHhjYmJmaHp3cHdhcnl3Y2J2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NzM4MjM3MSwiZXhwIjoyMDkyOTU4MzcxfQ.3RepAYMp5CKOnSNarwHkVUhrPyUT2Pp2mNZqu1_Gxek';

const supabase = createClient(supabaseUrl, supabaseKey);

async function activateAdmin() {
  console.log('--- ADMIN AKTİVASYON SCRIPT ---');
  
  // 1. Role sütununu ekle (eğer yoksa)
  // Not: service_role key ile RPC veya raw SQL çalıştıramayız doğrudan, 
  // ama tabloya bir veri eklemeyi deneyerek sütun varlığını kontrol edebiliriz 
  // veya sadece update atabiliriz. Eğer sütun yoksa hata verecektir.
  
  try {
    const { error: updateError } = await supabase
      .from('users')
      .update({ role: 'admin' })
      .eq('email', 'halil.yazicigil@gmail.com');

    if (updateError) {
      if (updateError.message.includes('column "role" of relation "users" does not exist')) {
        console.log('>>> HATA: "role" sütunu bulunamadı. Lütfen SQL Editor üzerinden ekleyin.');
        console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS role TEXT DEFAULT \'user\';');
      } else {
        console.error('>>> UPDATE HATASI:', updateError);
      }
    } else {
      console.log('>>> BAŞARI: halil.yazicigil@gmail.com kullanıcısı ADMIN yapıldı.');
    }
  } catch (err) {
    console.error('>>> BEKLENMEDİK HATA:', err);
  }
}

activateAdmin();
