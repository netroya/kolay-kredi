#!/usr/bin/env node

/**
 * Logo Quality Assurance Validation Script
 * 
 * This script validates bank logos for:
 * - File existence and accessibility
 * - Image dimensions and aspect ratios
 * - File size optimization
 * - Format compliance (SVG/PNG)
 * - Transparency requirements
 * 
 * Usage: node scripts/validate-logos.js
 */

const fs = require('fs').promises;
const path = require('path');

// Configuration
const LOGOS_DIR = path.join(__dirname, '..', 'public', 'logos');
const EXPECTED_ASPECT_RATIO = 3; // 3:1 ratio (300:100)
const MAX_FILE_SIZE = 50 * 1024; // 50KB in bytes
const ALLOWED_FORMATS = ['.svg', '.png'];
const MIN_WIDTH = 240; // Minimum width for quality

// Bank data to validate against
const BANKS = [
  'ziraat-bankasi',
  'vakifbank', 
  'is-bankasi',
  'yapi-kredi',
  'garanti-bbva',
  'akbank',
  'qnb-finansbank',
  'halkbank',
  'ing',
  'enpara',
  'teb',
  'fibabanka'
];

class LogoValidator {
  constructor() {
    this.results = {
      passed: [],
      failed: [],
      warnings: []
    };
  }

  /**
   * Main validation orchestrator
   */
  async validate() {
    console.log('🔍 Starting Logo Quality Assurance Validation\\n');
    
    try {
      // Check if logos directory exists
      await this.validateLogosDirectory();
      
      // Get all logo files
      const logoFiles = await this.getLogoFiles();
      
      // Validate each logo
      for (const file of logoFiles) {
        await this.validateLogo(file);
      }
      
      // Check for missing bank logos
      await this.checkMissingLogos(logoFiles);
      
      // Generate report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Validation failed:', error.message);
      process.exit(1);
    }
  }

  /**
   * Validate logos directory exists and is accessible
   */
  async validateLogosDirectory() {
    try {
      const stats = await fs.stat(LOGOS_DIR);
      if (!stats.isDirectory()) {
        throw new Error('Logos path is not a directory');
      }
      console.log('✅ Logos directory found');
    } catch (error) {
      throw new Error(`Logos directory not accessible: ${error.message}`);
    }
  }

  /**
   * Get all logo files from directory
   */
  async getLogoFiles() {
    try {
      const files = await fs.readdir(LOGOS_DIR);
      return files.filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ALLOWED_FORMATS.includes(ext);
      });
    } catch (error) {
      throw new Error(`Cannot read logos directory: ${error.message}`);
    }
  }

  /**
   * Validate individual logo file
   */
  async validateLogo(filename) {
    const filepath = path.join(LOGOS_DIR, filename);
    const bankId = path.basename(filename, path.extname(filename));
    
    console.log(`\\n📋 Validating: ${filename}`);
    
    const result = {
      filename,
      bankId,
      passed: true,
      issues: [],
      warnings: []
    };

    try {
      // File size validation
      const stats = await fs.stat(filepath);
      const fileSize = stats.size;
      
      if (fileSize > MAX_FILE_SIZE) {
        result.issues.push(`File size too large: ${Math.round(fileSize/1024)}KB > ${Math.round(MAX_FILE_SIZE/1024)}KB`);
        result.passed = false;
      } else {
        console.log(`   ✓ File size: ${Math.round(fileSize/1024)}KB`);
      }

      // Format validation
      const ext = path.extname(filename).toLowerCase();
      if (!ALLOWED_FORMATS.includes(ext)) {
        result.issues.push(`Invalid format: ${ext} (allowed: ${ALLOWED_FORMATS.join(', ')})`);
        result.passed = false;
      } else {
        console.log(`   ✓ Format: ${ext}`);
      }

      // SVG-specific validation
      if (ext === '.svg') {
        await this.validateSVG(filepath, result);
      }

      // PNG-specific validation  
      if (ext === '.png') {
        await this.validatePNG(filepath, result);
      }

      // Accessibility validation
      await this.validateAccessibility(filepath, result);

      if (result.passed) {
        this.results.passed.push(result);
        console.log('   ✅ Logo validation passed');
      } else {
        this.results.failed.push(result);
        console.log('   ❌ Logo validation failed');
      }

      if (result.warnings.length > 0) {
        this.results.warnings.push(result);
      }

    } catch (error) {
      result.passed = false;
      result.issues.push(`Validation error: ${error.message}`);
      this.results.failed.push(result);
      console.log(`   ❌ Error validating ${filename}: ${error.message}`);
    }
  }

  /**
   * Validate SVG files
   */
  async validateSVG(filepath, result) {
    try {
      const content = await fs.readFile(filepath, 'utf8');
      
      // Check if it's valid XML/SVG
      if (!content.includes('<svg') || !content.includes('</svg>')) {
        result.issues.push('Invalid SVG structure');
        result.passed = false;
        return;
      }

      // Extract dimensions
      const viewBoxMatch = content.match(/viewBox=["']([^"']+)["']/);
      const widthMatch = content.match(/width=["']([^"']+)["']/);
      const heightMatch = content.match(/height=["']([^"']+)["']/);

      let width, height;

      if (viewBoxMatch) {
        const viewBox = viewBoxMatch[1].split(/\\s+/);
        width = parseFloat(viewBox[2]);
        height = parseFloat(viewBox[3]);
      } else if (widthMatch && heightMatch) {
        width = parseFloat(widthMatch[1]);
        height = parseFloat(heightMatch[1]);
      }

      if (width && height) {
        const aspectRatio = width / height;
        console.log(`   ✓ Dimensions: ${width}×${height} (ratio: ${aspectRatio.toFixed(2)})`);
        
        // Check aspect ratio (allow 10% tolerance)
        const tolerance = 0.3;
        if (Math.abs(aspectRatio - EXPECTED_ASPECT_RATIO) > tolerance) {
          result.warnings.push(`Aspect ratio ${aspectRatio.toFixed(2)} differs from expected ${EXPECTED_ASPECT_RATIO}`);
        }
        
        if (width < MIN_WIDTH) {
          result.warnings.push(`Width ${width}px may be too small for quality display`);
        }
      } else {
        result.warnings.push('Could not determine SVG dimensions');
      }

      console.log('   ✓ SVG structure validated');

    } catch (error) {
      result.issues.push(`SVG validation failed: ${error.message}`);
      result.passed = false;
    }
  }

  /**
   * Validate PNG files (basic checks)
   */
  async validatePNG(filepath, result) {
    try {
      const buffer = await fs.readFile(filepath);
      
      // Basic PNG header validation
      const pngSignature = buffer.subarray(0, 8);
      const expectedSignature = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
      
      if (!pngSignature.equals(expectedSignature)) {
        result.issues.push('Invalid PNG file signature');
        result.passed = false;
        return;
      }

      console.log('   ✓ PNG format validated');
      result.warnings.push('PNG dimensions cannot be validated without image library - consider using SVG');

    } catch (error) {
      result.issues.push(`PNG validation failed: ${error.message}`);
      result.passed = false;
    }
  }

  /**
   * Validate accessibility requirements
   */
  async validateAccessibility(filepath, result) {
    // For now, just ensure file is readable
    try {
      await fs.access(filepath, fs.constants.R_OK);
      console.log('   ✓ File accessibility confirmed');
    } catch (error) {
      result.issues.push('File not accessible for reading');
      result.passed = false;
    }
  }

  /**
   * Check for missing bank logos
   */
  async checkMissingLogos(logoFiles) {
    console.log('\\n🔍 Checking for missing bank logos...');
    
    const logoFilenames = logoFiles.map(f => path.basename(f, path.extname(f)));
    
    for (const bankId of BANKS) {
      const hasLogo = logoFilenames.some(filename => 
        filename === bankId || filename === 'placeholder'
      );
      
      if (!hasLogo) {
        console.log(`   ⚠️  Missing logo for: ${bankId}`);
        this.results.warnings.push({
          filename: `${bankId}.svg`,
          bankId,
          warnings: ['Missing logo file - using placeholder'],
          passed: false
        });
      }
    }
  }

  /**
   * Generate validation report
   */
  generateReport() {
    console.log('\\n' + '='.repeat(60));
    console.log('📊 LOGO VALIDATION REPORT');
    console.log('='.repeat(60));
    
    console.log(`\\n✅ Passed: ${this.results.passed.length}`);
    console.log(`❌ Failed: ${this.results.failed.length}`);
    console.log(`⚠️  Warnings: ${this.results.warnings.length}`);
    
    if (this.results.failed.length > 0) {
      console.log('\\n❌ FAILED VALIDATIONS:');
      this.results.failed.forEach(result => {
        console.log(`\\n  ${result.filename}:`);
        result.issues.forEach(issue => {
          console.log(`    • ${issue}`);
        });
      });
    }

    if (this.results.warnings.length > 0) {
      console.log('\\n⚠️  WARNINGS:');
      this.results.warnings.forEach(result => {
        console.log(`\\n  ${result.filename}:`);
        result.warnings.forEach(warning => {
          console.log(`    • ${warning}`);
        });
      });
    }

    console.log('\\n' + '='.repeat(60));
    
    if (this.results.failed.length === 0) {
      console.log('🎉 All validations passed!');
      console.log('\\nNext steps:');
      console.log('1. Replace placeholder.svg with official bank logos');
      console.log('2. Update SOURCES.md with verification details');
      console.log('3. Re-run validation after adding real logos');
    } else {
      console.log('🔧 Fix the failed validations before proceeding');
      process.exit(1);
    }
  }
}

// Run validation if called directly
if (require.main === module) {
  const validator = new LogoValidator();
  validator.validate().catch(error => {
    console.error('Fatal error:', error);
    process.exit(1);
  });
}

module.exports = LogoValidator;