/**
 * 🧪 SANDBOX MOCK SERVISLERI
 * Bu servis, testler sırasında gerçek veritabanı bağlantılarını ve harici API'leri (Vertex AI, ElevenLabs)
 * taklit ederek, hiçbir harici ağ çağrısı yapmadan, sıfır maliyetle uçtan uca akışı simüle eder.
 */

export interface MockJob {
  id: string;
  user_id: string;
  status: string;
  progress: number;
  story_id: string | null;
  payload: any;
  fingerprint: string;
  scheduled_at: string;
  estimated_duration: number;
  error_message?: string;
  created_at: string;
}

export interface MockStory {
  id: string;
  user_id: string;
  title: string;
  content_json: any;
  image_url: string;
  audio_url: string;
  is_shuffle: boolean;
  metadata: any;
}

export interface MockSlot {
  slot_name: 'primary' | 'backup';
  status: 'idle' | 'busy';
  job_id: string | null;
  locked_at: string | null;
}

// 💾 IN-MEMORY SANAL VERİTABANI STATE'İ
export class SandboxDatabase {
  static jobs: MockJob[] = [];
  static stories: MockStory[] = [];
  static slots: MockSlot[] = [
    { slot_name: 'primary', status: 'idle', job_id: null, locked_at: null },
    { slot_name: 'backup', status: 'idle', job_id: null, locked_at: null }
  ];

  static reset() {
    this.jobs = [];
    this.stories = [];
    this.slots = [
      { slot_name: 'primary', status: 'idle', job_id: null, locked_at: null },
      { slot_name: 'backup', status: 'idle', job_id: null, locked_at: null }
    ];
  }
}

// 🛡️ MOCK API SLOT BROKER (Canlı ApiSlotBroker ile %100 Uyumlu)
export class MockApiSlotBroker {
  static async acquireSlot(jobId: string): Promise<{ success: boolean; slot?: 'primary' | 'backup' }> {
    // Transaction skip locked simülasyonu
    const availableSlot = SandboxDatabase.slots.find(s => s.status === 'idle');
    if (!availableSlot) {
      return { success: false };
    }

    availableSlot.status = 'busy';
    availableSlot.job_id = jobId;
    availableSlot.locked_at = new Date().toISOString();

    return { success: true, slot: availableSlot.slot_name };
  }

  static async releaseSlot(jobId: string): Promise<boolean> {
    const activeSlot = SandboxDatabase.slots.find(s => s.job_id === jobId);
    if (!activeSlot) return false;

    activeSlot.status = 'idle';
    activeSlot.job_id = null;
    activeSlot.locked_at = null;
    return true;
  }
}

// 🎙️ MOCK ELEVENLABS & VERTEX AI CALLS (Sıfır Maliyetli İşlem)
export const MockExternalAPIs = {
  async generateStoryText(prompt: string): Promise<any> {
    return {
      title: "The Magic Lantern",
      scenes: [
        { scene: 1, text: "Once upon a time in a magic forest..." },
        { scene: 2, text: "They found a glowing light under the ancient oak tree." }
      ]
    };
  },

  async generateVoice(text: string, voiceName: string): Promise<string> {
    return `https://mock-cdn.lumibook.app/audio/mock-audio-${Date.now()}.mp3`;
  }
};
