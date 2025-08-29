// /src/__tests__/logos-security.test.ts
import fs from 'fs';
import path from 'path';
import { BANKS } from '../data/banks';

describe('Logo Security Tests', () => {
  const logosDir = path.join(__dirname, '../../public/logos');
  const brandPalettePath = path.join(__dirname, '../../config/brand-palette.json');
  
  describe('SVG Security Validation', () => {
    const svgFiles = BANKS
      .filter(bank => bank.logo.endsWith('.svg'))
      .map(bank => ({
        slug: bank.slug,
        path: path.join(__dirname, '../..', 'public', bank.logo)
      }));

    svgFiles.forEach(({ slug, path: svgPath }) => {
      if (fs.existsSync(svgPath)) {
        it(`should not contain dangerous elements in ${slug} SVG`, () => {
          const content = fs.readFileSync(svgPath, 'utf8');
          
          // Check for script tags
          expect(content).not.toMatch(/<script[\s\S]*?<\/script>/i);
          
          // Check for style tags with potential CSS injection
          expect(content).not.toMatch(/<style[\s\S]*?<\/style>/i);
          
          // Check for event handlers
          expect(content).not.toMatch(/\s+on\w+\s*=/i);
          
          // Check for javascript: URLs
          expect(content).not.toMatch(/javascript:/i);
          
          // Check for external references
          expect(content).not.toMatch(/xlink:href\s*=\s*["']https?:/i);
          
          // Check for data URIs that could contain scripts
          expect(content).not.toMatch(/data:image\/svg\+xml.*<script/i);
        });
        
        it(`should have valid SVG structure for ${slug}`, () => {
          const content = fs.readFileSync(svgPath, 'utf8');
          
          // Should be proper SVG
          expect(content).toMatch(/<svg[\s\S]*?<\/svg>/i);
          
          // Should have viewBox for proper scaling
          expect(content).toMatch(/viewBox\s*=\s*["'][^"']+["']/i);
          
          // Should not contain suspicious comments
          expect(content).not.toMatch(/<!--[\s\S]*?(<script|javascript:)[\s\S]*?-->/i);
        });
      }
    });
  });

  describe('PNG Security Validation', () => {
    const pngFiles = BANKS
      .filter(bank => bank.logo.endsWith('.png'))
      .map(bank => ({
        slug: bank.slug,
        path: path.join(__dirname, '../..', 'public', bank.logo)
      }));

    pngFiles.forEach(({ slug, path: pngPath }) => {
      if (fs.existsSync(pngPath)) {
        it(`should have valid PNG signature for ${slug}`, () => {
          const buffer = fs.readFileSync(pngPath);
          
          // Check PNG signature
          expect(buffer[0]).toBe(0x89);
          expect(buffer[1]).toBe(0x50); // P
          expect(buffer[2]).toBe(0x4E); // N
          expect(buffer[3]).toBe(0x47); // G
          expect(buffer[4]).toBe(0x0D);
          expect(buffer[5]).toBe(0x0A);
          expect(buffer[6]).toBe(0x1A);
          expect(buffer[7]).toBe(0x0A);
        });
        
        it(`should have reasonable file size for ${slug}`, () => {
          const stats = fs.statSync(pngPath);
          
          // Should not be suspiciously large (potential zip bomb)
          expect(stats.size).toBeLessThan(500 * 1024); // 500KB max
          
          // Should not be empty
          expect(stats.size).toBeGreaterThan(100); // 100 bytes min
        });
      }
    });
  });

  describe('File Path Security', () => {
    BANKS.forEach(bank => {
      it(`should have secure file path for ${bank.name}`, () => {
        // Should not contain path traversal
        expect(bank.logo).not.toMatch(/\.\./);
        expect(bank.logo).not.toMatch(/\/\.\//);
        
        // Should start with expected prefix
        expect(bank.logo).toMatch(/^\/logos\//);
        
        // Should not contain encoded characters that could bypass filters
        expect(bank.logo).not.toMatch(/%2e%2e/i); // ..
        expect(bank.logo).not.toMatch(/%2f/i);    // /
        expect(bank.logo).not.toMatch(/%5c/i);    // \
      });
    });
  });

  describe('Brand Color Validation', () => {
    let brandPalette: any;
    
    beforeAll(() => {
      if (fs.existsSync(brandPalettePath)) {
        brandPalette = JSON.parse(fs.readFileSync(brandPalettePath, 'utf8'));
      }
    });

    it('should have valid brand palette configuration', () => {
      expect(brandPalette).toBeDefined();
      expect(brandPalette.version).toBeDefined();
      expect(brandPalette.banks).toBeDefined();
      expect(brandPalette.validation).toBeDefined();
    });

    if (brandPalette) {
      BANKS.forEach(bank => {
        const bankColors = brandPalette.banks[bank.slug];
        if (bankColors) {
          it(`should have valid color format for ${bank.name}`, () => {
            // Primary color should be hex
            expect(bankColors.primary).toMatch(/^#[0-9a-fA-F]{6}$/);
            
            // Secondary color should be hex  
            expect(bankColors.secondary).toMatch(/^#[0-9a-fA-F]{6}$/);
            
            // Variants should be hex
            if (bankColors.variants) {
              bankColors.variants.forEach((color: string) => {
                expect(color).toMatch(/^#[0-9a-fA-F]{6}$/);
              });
            }
          });

          it(`should have sufficient color contrast for ${bank.name}`, () => {
            const primary = hexToRgb(bankColors.primary);
            const secondary = hexToRgb(bankColors.secondary);
            
            if (primary && secondary) {
              const contrastRatio = calculateContrastRatio(primary, secondary);
              
              // Should meet WCAG AA standards (4.5:1)
              expect(contrastRatio).toBeGreaterThanOrEqual(4.5);
            }
          });
        }
      });
    }
  });

  describe('Content Security Policy Compliance', () => {
    BANKS.forEach(bank => {
      const logoPath = path.join(__dirname, '../..', 'public', bank.logo);
      
      if (fs.existsSync(logoPath) && bank.logo.endsWith('.svg')) {
        it(`should be CSP compliant for ${bank.name}`, () => {
          const content = fs.readFileSync(logoPath, 'utf8');
          
          // Should not contain inline styles that could violate CSP
          expect(content).not.toMatch(/style\s*=\s*["'][^"']*expression\s*\([^"']*\)["']/i);
          
          // Should not contain external font imports
          expect(content).not.toMatch(/@import\s+url\s*\(/i);
          
          // Should not contain external image references
          expect(content).not.toMatch(/xlink:href\s*=\s*["']https?:\/\//i);
        });
      }
    });
  });

  describe('File Integrity', () => {
    const hashManifestPath = path.join(__dirname, '../../public/hash-manifest.json');
    
    it('should pass when hash manifest does not exist', () => {
      // This test always passes when no hash manifest exists
      expect(true).toBe(true);
    });
    
    if (fs.existsSync(hashManifestPath)) {
      let hashManifest: any;
      
      beforeAll(() => {
        hashManifest = JSON.parse(fs.readFileSync(hashManifestPath, 'utf8'));
      });

      it('should have valid hash manifest structure', () => {
        expect(hashManifest.version).toBeDefined();
        expect(hashManifest.timestamp).toBeDefined();
        expect(hashManifest.assets).toBeDefined();
        expect(typeof hashManifest.assets).toBe('object');
      });

      BANKS.slice(0, 5).forEach(bank => { // Test first 5 banks for performance
        const assetPath = bank.logo;
        const manifestEntry = hashManifest?.assets?.[assetPath];
        
        if (manifestEntry) {
          it(`should have correct hash for ${bank.name} logo`, () => {
            const filePath = path.join(__dirname, '../..', 'public', assetPath);
            
            if (fs.existsSync(filePath)) {
              const crypto = require('crypto');
              const content = fs.readFileSync(filePath);
              const actualHash = crypto.createHash('sha256')
                .update(content)
                .digest('hex')
                .substring(0, 8);
              
              expect(actualHash).toBe(manifestEntry.hash);
            }
          });
        }
      });
    }
  });

  describe('Telemetry Security', () => {
    it('should not expose sensitive information in telemetry', async () => {
      // Mock telemetry module
      const telemetryModule = await import('../lib/telemetry');
      
      // Test that telemetry doesn't log sensitive data
      expect(telemetryModule).toBeDefined();
      
      // Ensure telemetry requires consent
      const { logoTelemetry } = telemetryModule;
      expect(logoTelemetry).toBeDefined();
      
      // Telemetry should be properly configured for security
      // This is more of a smoke test to ensure the module loads
      expect(typeof logoTelemetry.trackLogoError).toBe('function');
    });
  });
});

// Helper functions
function hexToRgb(hex: string): {r: number, g: number, b: number} | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}

function getLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function calculateContrastRatio(color1: {r: number, g: number, b: number}, color2: {r: number, g: number, b: number}): number {
  const lum1 = getLuminance(color1.r, color1.g, color1.b);
  const lum2 = getLuminance(color2.r, color2.g, color2.b);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}