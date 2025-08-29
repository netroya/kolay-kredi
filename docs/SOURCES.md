# 🏦 Bank Logo Sources (Official)

## Logo Source Registry

| Bank Name | Slug | Source URL | Access | Last Checked |
|-----------|------|------------|---------|-------------|
| Ziraat Bankası | `ziraat` | https://www.ziraatbank.com.tr/tr/kurumsal/hakkimizda/basin-odasi/gorseller | Public | 2025-08-29 |
| VakıfBank | `vakifbank` | https://www.vakifbank.com.tr/logolarimiz.aspx | Public | 2025-08-29 |
| Halkbank | `halkbank` | https://www.halkbank.com.tr/tr/bilgi-toplumu-hizmetleri/banka-bilgileri.html | Public | 2025-08-29 |
| QNB Finansbank | `qnb-finansbank` | https://www.qnb.com.tr/qnbyi-taniyin/basin-odasi/logolar-ve-diger-gorseller | Public | 2025-08-29 |
| ING Türkiye | `ing` | https://www.ing.com.tr/en/corporate-identity/corporate-logo-gallery | Public | 2025-08-29 |
| Fibabanka | `fibabanka` | https://www.fibabanka.com.tr/hakkimizda/kurumsal-iletisim/gorsel-galeri/fibabanka-logo-yeni | Public | 2025-08-29 |
| Türkiye İş Bankası | `isbank` | https://www.isbank.com.tr/bankamizi-taniyin/basin-aciklamasi | Request Required | 2025-08-29 |
| Garanti BBVA | `garanti-bbva` | https://www.garantibbva.com.tr/en/corporate-communications | Request Required | 2025-08-29 |
| Yapı Kredi | `yapikredi` | https://www.yapikredi.com.tr/yapi-kredi-hakkinda/iletisim | Request Required | 2025-08-29 |
| Akbank | `akbank` | https://www.akbank.com/en/about-us/support-center/contact-information | Request Required | 2025-08-29 |
| TEB | `teb` | https://www.teb.com.tr/hakkimizda/basin-merkezi | Public | 2025-08-29 |
| Enpara.com | `enpara` | https://www.enpara.com/hakkimizda | Public | 2025-08-29 |

## Manual Download Checklist

### Prerequisites
```bash
# Create manual logos directory
mkdir -p manual-logos

# Ensure proper permissions
chmod 755 manual-logos
```

### Download Steps

1. **Visit Official Source**: Use the URLs from the table above
2. **Select Logo Format**: 
   - **TEB (SVG tercih)**: Prefer vector format from press room
   - Prefer SVG (vector format)
   - PNG acceptable (high resolution, transparent background)
   - Avoid JPG/JPEG (no transparency)

3. **File Naming Convention**:
   ```
   manual-logos/{slug}.svg
   manual-logos/{slug}.png
   
   Examples:
   manual-logos/ziraat.svg
   manual-logos/vakifbank.png
   manual-logos/isbank.svg
   ```

4. **Quality Requirements**:
   - **SVG**: Must have viewBox, clean markup
   - **PNG**: Transparent background, min 240×80px, max 960×320px
   - **Size**: < 50KB per file
   - **Aspect Ratio**: Approximately 3:1 (width:height)

### Verification Command
```bash
# Dry-run check (no changes)
npm run logo:qa

# Process and optimize logos
npm run logo:ingest

# Generate detailed report
npm run logo:report
```

## Legal & Brand Usage Notes

### ⚠️ Important Disclaimers

1. **No Automated Downloads**: This system does NOT automatically download logos from bank websites. All downloads must be performed manually by authorized personnel.

2. **Brand Guidelines Compliance**: Each bank's logo usage must comply with their official brand guidelines. Check each bank's brand portal for:
   - Minimum size requirements
   - Clear space specifications  
   - Color variations allowed
   - Prohibited modifications

3. **Fair Use**: Logos are used under fair use provisions for comparative financial service information display.

4. **Attribution**: When required by brand guidelines, proper attribution is provided in the application footer.

### Access Types

- **Public**: Logos available on public brand/press pages
- **Request Required**: Must contact corporate communications for logo files
- **Brand Portal**: Requires registration on official brand portal

### Contact Templates

#### For "Request Required" Banks:

**Subject**: Logo Usage Request - Kolay Kredi Comparison Platform

**Template**:
```
Dear [Bank] Corporate Communications Team,

We are developing "Kolay Kredi," a consumer financial comparison platform 
that helps Turkish consumers compare loan and credit products transparently.

We would like to request permission to use [Bank Name]'s official logo in 
our comparison tables and informational materials. Our usage will be:

- Limited to product comparison contexts
- Non-commercial/educational purpose
- Compliant with your brand guidelines
- Properly attributed as per your requirements

Could you please provide:
1. Official logo files (SVG preferred, PNG acceptable)
2. Brand usage guidelines for our use case
3. Any attribution requirements

Platform: https://netroya.github.io/kolay-kredi/
Contact: [Your Contact Information]

Thank you for your consideration.
```

## Troubleshooting

### Common Issues

**❌ Logo too large (>50KB)**
```bash
# SVG: Check for embedded images or unoptimized paths
# PNG: Reduce dimensions or increase compression
```

**❌ Invalid viewBox (SVG)**
```bash
# Must have format: viewBox="0 0 width height"
# Example: viewBox="0 0 240 80"
```

**❌ Non-transparent background (PNG)**
```bash
# Use PNG with alpha channel
# Avoid logos with white/colored backgrounds
```

**❌ Wrong aspect ratio**
```bash
# Target: 3:1 ratio (3×width = 1×height)
# Acceptable range: 2.5:1 to 4:1
```

### File Structure After Processing
```
public/
  logos/
    banks/
      ziraat.svg
      vakifbank.png
      isbank.svg
      ...

src/
  data/
    banks.ts (updated with logo paths)

reports/
  logo-qa.json (quality assurance report)
```

### Support

For technical issues with logo processing:
- Check `reports/logo-qa.json` for detailed error messages
- Run `npm run logo:qa` for validation
- Ensure Node.js ≥18 and all dependencies installed

## Historical Source Information

### Public Banks

#### T.C. Ziraat Bankası A.Ş.
- **Official Download**: https://www.ziraatbank.com.tr/tr/bankamiz/basin-odasi/bankamiz-gorselleri ✅ VERIFIED
- **Press Room**: https://www.ziraatbank.com.tr/tr/kurumsal/basin-odasi
- **Available Formats**: JPG, PDF (vector)
- **Logo Variants**: 
  - Basic emblem: `zb_amblem.jpg`, `zb_amblem_vek.pdf` 
  - With slogan: `ziraat-sloganli-logo.pdf`
- **Usage Notes**: State bank - official logo usage allowed for informational purposes
- **Recommended**: PDF vector format for best quality
- **File Name**: `ziraat.svg` (to be converted from PDF)
- **Status**: ✅ OFFICIAL SOURCE VERIFIED - Ready for download

#### Türkiye Vakıflar Bankası T.A.O.
- **Official Download**: https://www.vakifbank.com.tr/tr/bankamiz/hakkimizda/logolarimiz ✅ VERIFIED
- **Press Room**: https://www.vakifbank.com.tr/kurumsal/basin-odasi
- **Available Formats**: JPG, PDF (3 background variants: yellow, white, black)
- **Background Variants**: Sarı zemin, Beyaz zemin, Siyah zemin
- **Usage Notes**: Public bank - logo usage for comparative purposes allowed
- **Recommended**: White background (beyaz zemin) for transparency compatibility
- **File Name**: `vakifbank.svg` (to be converted from PDF/JPG)
- **Status**: ✅ OFFICIAL SOURCE VERIFIED - Ready for download

#### Türkiye Halk Bankası A.Ş.
- **Official Download**: https://www.halkbank.com.tr/tr/bankamiz/kurumsal-iletisim/logolarimiz.html 🔍 CHECKING
- **Press Room**: https://www.halkbank.com.tr/kurumsal/basin-odasi
- **Logo Asset Found**: `/content/dam/corporate-website/tr/logo/logo-halkbank-white.svg`
- **Available Formats**: SVG confirmed (white version)
- **Usage Notes**: State bank - informational usage permitted
- **File Name**: `halkbank.svg`
- **Status**: 🔍 PARTIAL VERIFICATION - SVG asset located

### Private Banks

#### Türkiye İş Bankası A.Ş.
- **Official Download**: https://www.isbank.com.tr/TR/hakkimizda/basin-odasi/gorsel-arsiv
- **Press Room**: https://www.isbank.com.tr/TR/hakkimizda/basin-odasi
- **Brand Guidelines**: Available for media use
- **Usage Notes**: Turkey's first national bank - respectful usage required
- **Variants**: Full logo, abbreviated "İşbank", English versions
- **File Name**: `isbank.svg`
- **Status**: TODO - Manual download required

#### Yapı ve Kredi Bankası A.Ş.
- **Official Download**: https://www.yapikredi.com.tr/yapi-kredi-hakkinda/basin-merkezi/gorsel-arsiv
- **Press Room**: https://www.yapikredi.com.tr/yapi-kredi-hakkinda/basin-merkezi
- **Brand Guidelines**: Contact press office for guidelines
- **Usage Notes**: Koç Holding subsidiary - corporate standards apply
- **Variants**: Full name logo, "Yapı Kredi" short version, symbol mark
- **File Name**: `yapikredi.svg`
- **Status**: TODO - Manual download required

#### Garanti BBVA
- **Official Download**: https://www.garantibbva.com.tr/tr/sosyal_sorumluluk/basin_odasi/gorsel_arsiv
- **Press Room**: https://www.garantibbva.com.tr/tr/sosyal_sorumluluk/basin_odasi
- **Brand Guidelines**: BBVA global brand guidelines apply
- **Usage Notes**: International brand standards - careful usage required
- **Variants**: Garanti BBVA combined logo, separate Garanti logo, BBVA logo
- **File Name**: `garanti-bbva.svg`
- **Status**: TODO - Manual download required

#### Akbank T.A.Ş.
- **Official Download**: https://www.akbank.com (logo asset located) 🔍 CHECKING
- **Logo Asset Found**: `/SiteAssets/img/logo.svg` (site header)
- **Press Room**: Corporate communication to be contacted
- **Available Formats**: SVG confirmed (site asset)
- **Usage Notes**: Sabancı Holding standards - professional usage only
- **File Name**: `akbank.svg`
- **Status**: 🔍 PARTIAL VERIFICATION - SVG asset located on main site

#### QNB Finansbank A.Ş.
- **Official Download**: https://www.qnb.com.tr/qnbyi-taniyin/basin-odasi/logolar-ve-diger-gorseller ✅ VERIFIED
- **Press Room**: https://www.qnbfinansbank.com/hakkimizda/basin-odasi
- **Available Formats**: JPG (high resolution)
- **Logo Variants**: 
  - Main QNB logo: `GalleryImage-Image-465-2x.vsf`
  - Branch logo: `GalleryImage-Image-482-2x.vsf`
  - Crystal Tower logos: `GalleryImage-Image-476/484-2x.vsf`
- **Brand Symbolism**: Plus + multiplication signs overlay (growth symbolism)
- **Usage Notes**: International bank - respect QNB Group brand guidelines
- **File Name**: `qnb-finansbank.svg` (to be converted from JPG)
- **Status**: ✅ OFFICIAL SOURCE VERIFIED - Ready for download

#### ING Bank A.Ş.
- **Official Download**: https://www.ing.com.tr/tr/ing/basin-odasi/gorsel-galeri/kurumsal-logo ✅ VERIFIED
- **Press Room**: https://www.ing.com.tr/hakkimizda/basin-odasi
- **Available Formats**: PNG (high resolution)
- **Logo Variants**: 
  - White background: `ING_Logo_BeyazBG_Big.png`
  - Orange background: `ING_Logo_TuruncuBG_Big.png`
- **Brand Guidelines**: ING global brand guidelines (orange is signature color)
- **Usage Notes**: International brand - follow ING worldwide standards
- **Recommended**: White background for transparency compatibility
- **File Name**: `ing.svg` (to be converted from PNG)
- **Status**: ✅ OFFICIAL SOURCE VERIFIED - Ready for download

### Digital Banks

#### Enpara.com (QNB Finansbank)
- **Official Download**: https://www.enpara.com/hakkimizda/basin-odasi
- **Parent Bank**: QNB Finansbank press room
- **Brand Guidelines**: Digital bank specific guidelines
- **Usage Notes**: Digital-first brand - modern usage contexts preferred
- **Variants**: Full Enpara.com logo, compact logo, app icon versions
- **File Name**: `enpara.svg`
- **Status**: TODO - Manual download required

#### Türk Ekonomi Bankası A.Ş. (TEB)
- **Official Download**: https://www.teb.com.tr/hakkimizda/basin-odasi/gorsel-arsiv
- **Press Room**: https://www.teb.com.tr/hakkimizda/basin-odasi
- **Brand Guidelines**: BNP Paribas group standards apply
- **Usage Notes**: International partnership - respect BNP Paribas guidelines
- **Variants**: TEB full logo, abbreviated logo, BNP Paribas co-branding
- **File Name**: `teb.svg`
- **Status**: TODO - Manual download required

#### CEPTETEB
- **Official Download**: https://www.cepteteb.com.tr/hakkimizda
- **Parent**: TEB press room materials
- **Brand Guidelines**: Mobile-first brand guidelines
- **Usage Notes**: Mobile banking brand - digital context preferred
- **Variants**: CEPTETEB full logo, app icon, simplified versions
- **File Name**: `cepteteb.svg`
- **Status**: TODO - Manual download required

#### Fibabanka A.Ş.
- **Official Download**: https://www.fibabanka.com.tr/hakkimizda/kurumsal-iletisim/gorsel-galeri ✅ VERIFIED
- **Direct Download**: `fibabanka-logo5ba2dec8981c4e72a41a32d45b669e6c.zip`
- **Available Formats**: ZIP archive (JPG confirmed, may contain other formats)
- **Logo Package**: Official logo bundle in compressed format
- **Usage Notes**: Premium banking brand - upscale presentation required
- **File Name**: `fibabanka.svg` (to be converted from ZIP contents)
- **Status**: ✅ OFFICIAL SOURCE VERIFIED - ZIP package ready for download

## Legal Disclaimer

- All logos remain the intellectual property of their respective banks
- Logos are used for informational and comparative purposes only
- No endorsement or partnership is implied
- Banks retain all trademark and copyright rights
- Logos will be removed immediately upon request from rights holders
- Usage complies with fair use provisions for comparative advertising

## File Requirements

### Technical Specifications
- **Format**: SVG preferred (scalable), PNG acceptable (min 480×176 for 3:1 ratio)
- **Background**: Transparent required
- **Colors**: Original brand colors only
- **Quality**: Vector format or high-resolution raster
- **Size**: Optimized for web (under 50KB)

### Naming Convention
- Use bank slug as defined in `src/data/banks.ts`
- Format: `{slug}.svg` or `{slug}.png`
- No spaces, use hyphens for multi-word names
- Lowercase preferred for consistency

## Manual Download Process

1. **Verification**: Confirm source is official bank website/press room
2. **Selection**: Choose highest quality, transparent background version
3. **Download**: Save with correct filename in `/public/logos/`
4. **Validation**: Run `npm run logo-qa` to validate quality
5. **Testing**: Run `npm test` to verify all logos load correctly
6. **Documentation**: Update this file with download date and version

## Contact Information

For questions about logo usage or to report copyright concerns:
- **Email**: legal@kolaykredi.com
- **Subject**: Logo Usage Inquiry - [Bank Name]

---

**Last Updated**: August 28, 2024
**Review Schedule**: Monthly verification of download links
**Compliance**: All logos pending manual verification and download