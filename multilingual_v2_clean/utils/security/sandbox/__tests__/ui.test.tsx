import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

// 📊 MOCK INTERACTIVE QUEUE DISPLAY COMPONENT
// 2 API yuvasına sahip çift kanallı sistemde sırayı hesaplama formülü:
// Math.ceil(absoluteQueuePosition / 2)
interface QueueDisplayProps {
  absoluteQueuePosition: number;
}

const QueueDisplay: React.FC<QueueDisplayProps> = ({ absoluteQueuePosition }) => {
  const finalQueuePos = Math.ceil(absoluteQueuePosition / 2);
  
  return (
    <div className="p-6 bg-slate-900 text-white rounded-lg shadow-xl border border-indigo-500">
      <h3 className="text-lg font-bold text-indigo-400">⏱️ Masal Sıra Durumu</h3>
      
      {absoluteQueuePosition <= 2 ? (
        <div className="text-emerald-400 font-semibold mt-2">
          ✨ Sırada bekleyen yok! Masalınız şu anda işleniyor...
        </div>
      ) : (
        <div className="mt-2 text-slate-300">
          Önünüzde bekleyen mutlak istek sayısı: <span className="text-indigo-300 font-bold">{absoluteQueuePosition}</span>
          <div className="text-xl font-extrabold text-amber-400 mt-1">
            Tahmini Sıranız: {finalQueuePos}. Sıradadasınız
          </div>
        </div>
      )}
    </div>
  );
};

describe('🌐 LUMIBOOK SANDBOX FRONTEND/UI TESTS', () => {
  it('Eşzamanlı 20 iş varsa, 2 kanallı sistemimize göre sırayı 10. sıra olarak hesaplayıp ekranda göstermelidir', () => {
    render(<QueueDisplay absoluteQueuePosition={20} />);
    
    // 20 / 2 = 10. sıra olmalıdır
    const queueText = screen.getByText('Tahmini Sıranız: 10. Sıradadasınız');
    expect(queueText).toBeInTheDocument();
    
    const countText = screen.getByText('20');
    expect(countText).toBeInTheDocument();
  });

  it('Eşzamanlı 19 iş varsa, yukarı yuvarlayıp sırayı yine 10. sıra olarak göstermelidir', () => {
    render(<QueueDisplay absoluteQueuePosition={19} />);
    
    // Math.ceil(19 / 2) = 10. sıra olmalıdır
    const queueText = screen.getByText('Tahmini Sıranız: 10. Sıradadasınız');
    expect(queueText).toBeInTheDocument();
  });

  it('Eşzamanlı 2 veya daha az iş varsa, sıradasınız yerine masal işleniyor yazmalıdır', () => {
    render(<QueueDisplay absoluteQueuePosition={2} />);
    
    const processText = screen.getByText('✨ Sırada bekleyen yok! Masalınız şu anda işleniyor...');
    expect(processText).toBeInTheDocument();
  });
});
