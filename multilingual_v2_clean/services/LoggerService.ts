import { createClient } from '@/utils/supabase/server'

export type LogLevel = 'INFO' | 'WARN' | 'ERROR' | 'FATAL'
export type LogService = 'WORKER' | 'PAYMENT' | 'AUTH' | 'SYSTEM' | 'QUOTA'

interface LogData {
  level: LogLevel
  service: LogService
  message: string
  location: string
  userId?: string
  userEmail?: string
  metadata?: any
}

/**
 * 🛡️ LoggerService: Tüm sistemin kurumsal loglama motoru.
 * Hataları Supabase'e (error_logs) kurumsal standartlarda kaydeder.
 */
export class LoggerService {
  
  static async log({
    level,
    service,
    message,
    location,
    userId,
    userEmail,
    metadata
  }: LogData) {
    try {
      // Server-side supabase client
      const supabase = await createClient()

      // Hata kaydını oluştur
      const logEntry = {
        level,
        service,
        error_message: message,
        location,
        user_id: userId || null,
        user_email: userEmail || null,
        metadata: metadata || {},
        created_at: new Date().toISOString()
      }

      // Supabase'e gönder
      const { error } = await supabase.from('error_logs').insert(logEntry)

      if (error) {
        console.error('>>> [LoggerService] Veritabanına yazma hatası:', error.message)
      } else {
        console.log(`>>> [LoggerService] [${level}] [${service}] ${message}`)
      }
    } catch (err: any) {
      // Loglama sisteminin kendisi asla ana sistemi çökertmemeli
      console.error('>>> [LoggerService] Kritik Hata:', err.message)
    }
  }

  // --- Kolay Kullanım Yardımcıları ---

  static async info(service: LogService, message: string, location: string, metadata?: any) {
    return this.log({ level: 'INFO', service, message, location, metadata })
  }

  static async warn(service: LogService, message: string, location: string, metadata?: any) {
    return this.log({ level: 'WARN', service, message, location, metadata })
  }

  static async error(service: LogService, message: string, location: string, metadata?: any, userId?: string) {
    return this.log({ level: 'ERROR', service, message, location, metadata, userId })
  }

  static async fatal(service: LogService, message: string, location: string, metadata?: any, userId?: string) {
    return this.log({ level: 'FATAL', service, message, location, metadata, userId })
  }
}
