import { BANKS } from '../data/banks';
import fs from 'fs';
import path from 'path';

describe('Logo Tests', () => {
  const logosDir = path.join(__dirname, '../../public/logos');

  describe('Logo File Existence', () => {
    BANKS.forEach(bank => {
      it(`should have logo file for ${bank.name}`, () => {
        const logoPath = path.join(__dirname, '../..', 'public', bank.logo);
        expect(fs.existsSync(logoPath)).toBe(true);
      });
    });
  });

  describe('Logo Alt Text Validation', () => {
    BANKS.forEach(bank => {
      it(`should have proper alt text format for ${bank.name}`, () => {
        const expectedAlt = `${bank.name} logosu`;
        
        // Test Turkish alt text format
        expect(expectedAlt).toMatch(/\w+ logosu$/);
        
        // Test that name is not empty
        expect(bank.name.trim()).not.toBe('');
        
        // Test that name doesn't contain HTML/special chars
        expect(bank.name).not.toMatch(/[<>]/);
      });
    });
  });

  describe('Logo Path Validation', () => {
    BANKS.forEach(bank => {
      it(`should have valid logo path for ${bank.name}`, () => {
        // Should start with /logos/
        expect(bank.logo).toMatch(/^\/logos\//);
        
        // Should end with .svg or .png
        expect(bank.logo).toMatch(/\.(svg|png)$/);
        
        // Should not contain spaces
        expect(bank.logo).not.toMatch(/\s/);
        
        // Should match slug pattern
        const expectedPath = `/logos/${bank.slug}`;
        expect(bank.logo.startsWith(expectedPath)).toBe(true);
      });
    });
  });

  describe('Bank Slug Validation', () => {
    BANKS.forEach(bank => {
      it(`should have valid slug for ${bank.name}`, () => {
        // Should not contain spaces or uppercase
        expect(bank.slug).toMatch(/^[a-z0-9-]+$/);
        
        // Should not start or end with hyphen
        expect(bank.slug).not.toMatch(/^-|-$/);
        
        // Should not be empty
        expect(bank.slug.trim()).not.toBe('');
      });
    });
  });

  describe('Homepage URL Validation', () => {
    BANKS.forEach(bank => {
      it(`should have valid homepage URL for ${bank.name}`, () => {
        // Should be a valid URL
        expect(() => new URL(bank.homepage!)).not.toThrow();
        
        // Should use HTTPS
        expect(bank.homepage).toMatch(/^https:\/\//);
        
        // Should be a .com.tr or .com domain
        expect(bank.homepage).toMatch(/\.(com\.tr|com)($|\/)/);
      });
    });
  });

  describe('Background Preference Validation', () => {
    BANKS.forEach(bank => {
      it(`should have valid bgPref for ${bank.name}`, () => {
        expect(['light', 'dark', 'any']).toContain(bank.bgPref);
      });
    });
  });

  describe('Unique Constraints', () => {
    it('should have unique slugs', () => {
      const slugs = BANKS.map(b => b.slug);
      const uniqueSlugs = [...new Set(slugs)];
      expect(slugs.length).toBe(uniqueSlugs.length);
    });

    it('should have unique logo paths', () => {
      const logos = BANKS.map(b => b.logo);
      const uniqueLogos = [...new Set(logos)];
      expect(logos.length).toBe(uniqueLogos.length);
    });

    it('should have unique homepage URLs', () => {
      const homepages = BANKS.map(b => b.homepage).filter(Boolean);
      const uniqueHomepages = [...new Set(homepages)];
      expect(homepages.length).toBe(uniqueHomepages.length);
    });
  });

  describe('Logo File Size Validation', () => {
    BANKS.forEach(bank => {
      it(`should have reasonable file size for ${bank.name}`, () => {
        const logoPath = path.join(__dirname, '../..', 'public', bank.logo);
        
        if (fs.existsSync(logoPath)) {
          const stats = fs.statSync(logoPath);
          const fileSizeKB = stats.size / 1024;
          
          // Should be under 50KB for web optimization
          expect(fileSizeKB).toBeLessThan(50);
          
          // Should be at least 1KB (not empty)
          expect(fileSizeKB).toBeGreaterThan(1);
        }
      });
    });
  });

  describe('SVG Format Validation', () => {
    BANKS.forEach(bank => {
      if (bank.logo.endsWith('.svg')) {
        it(`should have valid SVG structure for ${bank.name}`, () => {
          const logoPath = path.join(__dirname, '../..', 'public', bank.logo);
          
          if (fs.existsSync(logoPath)) {
            const content = fs.readFileSync(logoPath, 'utf8');
            
            // Should contain SVG tags
            expect(content).toMatch(/<svg[\s\S]*<\/svg>/);
            
            // Should have viewBox for responsiveness
            expect(content).toMatch(/viewBox\s*=\s*["'][^"']+["']/);
            
            // Should not contain script tags (security)
            expect(content).not.toMatch(/<script/i);
          }
        });
      }
    });
  });

  describe('Accessibility', () => {
    BANKS.forEach(bank => {
      it(`should have accessible name for ${bank.name}`, () => {
        // Name should be readable and not too long
        expect(bank.name.length).toBeGreaterThan(2);
        expect(bank.name.length).toBeLessThan(50);
        
        // Should not start or end with whitespace
        expect(bank.name.trim()).toBe(bank.name);
        
        // Should contain actual text, not just symbols
        expect(bank.name).toMatch(/[a-zA-ZÇÖŞÜĞİçöşüği]/);
      });
    });
  });
});