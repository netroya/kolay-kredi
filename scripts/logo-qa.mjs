#!/usr/bin/env node

/**
 * Logo Quality Assurance Script
 * 
 * Scans public/logos/*.{svg,png} files and performs:
 * - SVG validation (viewBox required, width/height warnings)
 * - PNG transparency validation (background pixel alpha check)
 * - SVGO optimization for SVG files
 * 
 * Usage: npm run logo-qa
 */

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { optimize } from 'svgo';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const LOGOS_DIR = path.join(__dirname, '..', 'public', 'logos');
const SUPPORTED_FORMATS = ['.svg', '.png'];
const SVGO_CONFIG = {
  plugins: [
    'preset-default',
    'removeDimensions',
    'cleanupIds',
    'removeTitle',
    'removeDesc',
    {
      name: 'removeViewBox',
      active: false // Keep viewBox
    }
  ]
};

class LogoQA {
  constructor() {
    this.results = {
      processed: 0,
      errors: [],
      warnings: [],
      optimized: 0
    };
  }

  /**
   * Main QA process
   */
  async run() {
    console.log('🔍 Logo Kalite Kontrol Başlatılıyor...\n');
    
    try {
      // Check logos directory
      await this.checkLogosDirectory();
      
      // Get logo files
      const logoFiles = await this.getLogoFiles();
      
      if (logoFiles.length === 0) {
        console.log('⚠️  Logo dosyası bulunamadı.');
        return;
      }
      
      console.log(`📁 ${logoFiles.length} logo dosyası bulundu.\n`);
      
      // Process each logo
      for (const file of logoFiles) {
        await this.processLogo(file);
      }
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ QA işlemi başarısız:', error.message);
      process.exit(1);
    }
  }

  /**
   * Check if logos directory exists
   */
  async checkLogosDirectory() {
    try {
      const stats = await fs.stat(LOGOS_DIR);
      if (!stats.isDirectory()) {
        throw new Error('Logos klasörü bulunamadı');
      }
    } catch (error) {
      throw new Error(`Logos klasörüne erişim hatası: ${error.message}`);
    }
  }

  /**
   * Get all logo files
   */
  async getLogoFiles() {
    try {
      const files = await fs.readdir(LOGOS_DIR);
      return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return SUPPORTED_FORMATS.includes(ext);
      });
    } catch (error) {
      throw new Error(`Dosya listesi alınamadı: ${error.message}`);
    }
  }

  /**
   * Process individual logo file
   */
  async processLogo(filename) {
    const filepath = path.join(LOGOS_DIR, filename);
    const ext = path.extname(filename).toLowerCase();
    
    console.log(`📋 İşleniyor: ${filename}`);
    
    try {
      this.results.processed++;
      
      if (ext === '.svg') {
        await this.processSVG(filepath, filename);
      } else if (ext === '.png') {
        await this.processPNG(filepath, filename);
      }
      
      console.log(`   ✅ Tamamlandı\n`);
      
    } catch (error) {
      this.results.errors.push({
        file: filename,
        error: error.message
      });
      console.log(`   ❌ Hata: ${error.message}\n`);
    }
  }

  /**
   * Process SVG file
   */
  async processSVG(filepath, filename) {
    const content = await fs.readFile(filepath, 'utf8');
    
    // Validate SVG structure
    if (!content.includes('<svg') || !content.includes('</svg>')) {
      throw new Error('Geçersiz SVG yapısı');
    }
    
    // Check viewBox (required)
    const hasViewBox = /viewBox\\s*=\\s*["'][^"']+["']/.test(content);
    if (!hasViewBox) {
      this.results.errors.push({
        file: filename,
        error: 'viewBox zorunludur (responsive tasarım için)'
      });
      console.log(`   ❌ viewBox eksik`);
    } else {
      console.log(`   ✓ viewBox mevcut`);
    }
    
    // Check width/height (warning if missing)
    const hasWidth = /width\\s*=\\s*["'][^"']+["']/.test(content);
    const hasHeight = /height\\s*=\\s*["'][^"']+["']/.test(content);
    
    if (!hasWidth || !hasHeight) {
      this.results.warnings.push({
        file: filename,
        warning: 'width/height attributes önerilir (SEO için)'
      });
      console.log(`   ⚠️  width/height eksik`);
    } else {
      console.log(`   ✓ width/height mevcut`);
    }
    
    // SVGO optimization
    try {
      const result = optimize(content, {
        path: filepath,
        ...SVGO_CONFIG
      });
      
      if (result.data !== content) {
        await fs.writeFile(filepath, result.data, 'utf8');
        this.results.optimized++;
        
        const originalSize = Buffer.byteLength(content, 'utf8');
        const optimizedSize = Buffer.byteLength(result.data, 'utf8');
        const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
        
        console.log(`   🚀 SVGO optimize: ${originalSize}B → ${optimizedSize}B (${savings}% tasarruf)`);
      } else {
        console.log(`   ✓ SVGO: Zaten optimize`);
      }
    } catch (optimizeError) {
      this.results.warnings.push({
        file: filename,
        warning: `SVGO optimizasyon hatası: ${optimizeError.message}`
      });
      console.log(`   ⚠️  SVGO hatası: ${optimizeError.message}`);
    }
  }

  /**
   * Process PNG file
   */
  async processPNG(filepath, filename) {
    const buffer = await fs.readFile(filepath);
    
    // Validate PNG signature
    const pngSignature = buffer.subarray(0, 8);
    const expectedSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
    
    if (!pngSignature.equals(expectedSignature)) {
      throw new Error('Geçersiz PNG dosya imzası');
    }
    
    console.log(`   ✓ PNG formatı geçerli`);
    
    // Check transparency (basic check for RGBA)
    // This is a simplified check - for production use a proper PNG library
    const hasTransparency = this.checkPNGTransparency(buffer);
    
    if (!hasTransparency) {
      this.results.warnings.push({
        file: filename,
        warning: 'PNG dosyasında şeffaflık algılanamadı - arkaplan şeffaf olmalı'
      });
      console.log(`   ⚠️  Şeffaflık algılanamadı`);
    } else {
      console.log(`   ✓ Şeffaflık algılandı`);
    }
    
    // File size check
    const fileSizeKB = Math.round(buffer.length / 1024);
    console.log(`   📊 Dosya boyutu: ${fileSizeKB}KB`);
    
    if (fileSizeKB > 50) {
      this.results.warnings.push({
        file: filename,
        warning: `Dosya boyutu büyük: ${fileSizeKB}KB (50KB önerilir)`
      });
      console.log(`   ⚠️  Dosya boyutu büyük`);
    }
  }

  /**
   * Basic PNG transparency check
   */
  checkPNGTransparency(buffer) {
    try {
      // Look for IHDR chunk to get color type
      let offset = 8; // Skip PNG signature
      
      while (offset < buffer.length - 8) {
        const length = buffer.readUInt32BE(offset);
        const type = buffer.toString('ascii', offset + 4, offset + 8);
        
        if (type === 'IHDR') {
          const colorType = buffer[offset + 17]; // Color type is at byte 25 from file start
          
          // Color type 4 = grayscale with alpha, 6 = RGB with alpha
          if (colorType === 4 || colorType === 6) {
            return true;
          }
          
          // Color type 3 = palette with possible transparency
          if (colorType === 3) {
            // Look for tRNS chunk
            let searchOffset = offset + 8 + length + 4;
            while (searchOffset < buffer.length - 8) {
              const chunkLength = buffer.readUInt32BE(searchOffset);
              const chunkType = buffer.toString('ascii', searchOffset + 4, searchOffset + 8);
              
              if (chunkType === 'tRNS') {
                return true;
              }
              
              searchOffset += 8 + chunkLength + 4;
            }
          }
          
          return false;
        }
        
        offset += 8 + length + 4; // Move to next chunk
      }
      
      return false;
    } catch (error) {
      // If we can't parse, assume no transparency
      return false;
    }
  }

  /**
   * Generate final report
   */
  generateReport() {
    console.log('=' .repeat(60));
    console.log('📊 LOGO KALİTE KONTROL RAPORU');
    console.log('=' .repeat(60));
    
    console.log(`\\n📋 İşlem Özeti:`);
    console.log(`   • İşlenen dosya: ${this.results.processed}`);
    console.log(`   • Hata: ${this.results.errors.length}`);
    console.log(`   • Uyarı: ${this.results.warnings.length}`);
    console.log(`   • Optimize edilen: ${this.results.optimized}`);
    
    if (this.results.errors.length > 0) {
      console.log(`\\n❌ HATALAR:`);
      this.results.errors.forEach(item => {
        console.log(`   • ${item.file}: ${item.error}`);
      });
    }
    
    if (this.results.warnings.length > 0) {
      console.log(`\\n⚠️  UYARILAR:`);
      this.results.warnings.forEach(item => {
        console.log(`   • ${item.file}: ${item.warning}`);
      });
    }
    
    console.log(`\\n${'='.repeat(60)}`);
    
    if (this.results.errors.length === 0) {
      console.log('🎉 Kalite kontrol tamamlandı!');
      if (this.results.optimized > 0) {
        console.log(`✨ ${this.results.optimized} dosya optimize edildi.`);
      }
    } else {
      console.log('🔧 Hataları düzeltin ve tekrar çalıştırın.');
      process.exit(1);
    }
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const qa = new LogoQA();
  qa.run().catch(error => {
    console.error('Fatal hata:', error);
    process.exit(1);
  });
}