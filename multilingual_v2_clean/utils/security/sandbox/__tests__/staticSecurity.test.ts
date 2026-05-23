import { describe, it, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

describe('🔍 LUMIBOOK SANDBOX STATIC APPLICATION SECURITY TESTING (SAST)', () => {
  it('Proje package.json bağımlılıklarını denetleyip zafiyet içeren kütüphaneler barındırmadığını doğrulamalıdır', () => {
    // 1. package.json dosyasını oku
    const packageJsonPath = path.resolve(process.cwd(), 'package.json');
    const fileExists = fs.existsSync(packageJsonPath);
    expect(fileExists).toBe(true);

    const packageJsonContent = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = packageJsonContent.dependencies || {};
    const devDependencies = packageJsonContent.devDependencies || {};
    const allDependencies = { ...dependencies, ...devDependencies };

    // 2. Güvenlik Denetim Kuralları (SAST Rules)
    const dangerousLibraries = ['left-pad', 'vulnerable-mock-lib', 'old-jwt-decoder'];
    
    // Projede bilinen tehlikeli kütüphaneler olmamalıdır
    for (const lib of dangerousLibraries) {
      expect(allDependencies[lib]).toBeUndefined();
    }

    // 3. Kritik Core Kütüphane Sürüm Güvenceleri
    // Next.js 15+ olmalıdır
    const nextVersionStr = allDependencies['next'];
    expect(nextVersionStr).toBeDefined();
    
    const cleanVersion = nextVersionStr.replace(/[^0-9.]/g, '');
    const majorVersion = parseInt(cleanVersion.split('.')[0], 10);
    
    expect(majorVersion).toBeGreaterThanOrEqual(15); // Next.js sürümü güvenli (v15+)
  });
});
