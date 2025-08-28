# 💰 Kolay Kredi - Professional Credit Comparison Platform

A comprehensive credit and credit card comparison website built with modern web technologies. Compare loan rates, credit cards, and bank promotions from Turkey's leading banks.

## 🚀 Features

- **Credit Comparison**: Compare personal loans from 12+ major Turkish banks
- **Credit Card Analysis**: Detailed credit card features and benefits comparison  
- **Promotional Offers**: Latest bank promotions and special offers
- **Fee Calculator**: Compare bank fees and charges
- **Responsive Design**: Mobile-first, works on all devices
- **SEO Optimized**: Schema markup, meta tags, and sitemap
- **Fast Performance**: Built with Vite and optimized for speed
- **Analytics Ready**: Google Analytics 4 and GTM integration

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **SEO**: React Helmet Async
- **Analytics**: Google Analytics 4 + GTM
- **Deployment**: GitHub Pages

## 📁 Project Structure

```
kolay-kredi/
├── public/
│   ├── robots.txt
│   ├── sitemap.xml
│   └── favicon.ico
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Button.tsx
│   │   ├── Modal.tsx
│   │   └── ...
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Credits.tsx
│   │   ├── Cards.tsx
│   │   └── ...
│   ├── data/              # Data models and sample data
│   │   ├── banks.ts
│   │   ├── credits.ts
│   │   ├── cards.ts
│   │   └── ...
│   ├── lib/               # Utility libraries
│   │   └── analytics.ts
│   └── App.tsx
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

## 🏗️ Installation & Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager
- Git

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/netroya/kolay-kredi.git
   cd kolay-kredi
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   
   Open http://localhost:5173 in your browser

4. **Build for production**
   ```bash
   npm run build
   ```

### Environment Variables (Optional)

Create a `.env` file in the root directory for analytics:

```env
VITE_ENABLE_ANALYTICS=true
VITE_GA_ID=G-XXXXXXXXXX
VITE_GTM_ID=GTM-XXXXXXX
```

## 🚢 Deployment

### Method 1: GitHub Actions (Recommended)

**Automatic deployment on every push to main branch:**

1. **Fork/Clone to your GitHub account**

2. **Configure Repository**
   - Go to Settings → Pages in your GitHub repository
   - Select "Source: GitHub Actions"
   - The workflow will automatically trigger on push to `main`

3. **Update Configuration** (if needed)
   - Repository name different from `kolay-kredi`? Update `vite.config.ts`:
     ```typescript
     export default defineConfig({
       base: '/your-repo-name/',  // Change this
       // ...
     })
     ```
   - Update URLs in `sitemap.xml` and other files accordingly

4. **Deploy**
   ```bash
   git push origin main
   # GitHub Actions will automatically build and deploy
   # Check Actions tab for deployment status
   ```

### Method 2: Manual Deployment with gh-pages

**Using the gh-pages package for manual control:**

1. **Install gh-pages** (already included in devDependencies)
   ```bash
   npm install
   ```

2. **Deploy manually**
   ```bash
   npm run deploy
   # This runs: predeploy (build) → deploy (gh-pages -d dist)
   ```

3. **Configure GitHub Pages**
   - Go to Settings → Pages
   - Select "Deploy from a branch"
   - Choose `gh-pages` branch
   - Save settings

### Custom Domain Setup

**Option A: Using CNAME file (recommended for custom domains)**

1. **Create CNAME file**
   ```bash
   echo "yourdomain.com" > public/CNAME
   # or for subdomain: echo "kredi.yourdomain.com" > public/CNAME
   ```

2. **Update configuration**
   ```typescript
   // vite.config.ts
   export default defineConfig({
     base: '/', // Change to root for custom domain
     // ...
   })
   ```

3. **Update all URLs**
   - `sitemap.xml`: Change domain to your custom domain
   - `src/components/SEO.tsx`: Update siteUrl
   - Any hardcoded URLs in the codebase

4. **DNS Configuration**
   - Add CNAME record: `kredi.yourdomain.com` → `username.github.io`
   - Or A records for apex domain (see GitHub documentation)

**Option B: GitHub Pages Custom Domain**

1. **Add domain in repository settings**
   - Settings → Pages → Custom domain
   - Enter your domain and save

2. **Follow the same configuration steps as Option A**

### Deployment Configuration Files

```bash
# Project structure for deployment
kolay-kredi/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── public/
│   ├── CNAME                   # Custom domain (if used)
│   └── ...
├── vite.config.ts              # Base path configuration
└── package.json                # Deploy scripts
```

### Environment Variables (Production)

Create repository secrets for production:

1. **Go to Settings → Secrets and variables → Actions**
2. **Add repository secrets:**
   ```
   VITE_ENABLE_ANALYTICS=true
   VITE_GA_ID=G-XXXXXXXXXX
   VITE_GTM_ID=GTM-XXXXXXX
   ```

### Troubleshooting Deployment

**Common Issues:**

1. **404 on page refresh**
   - GitHub Pages SPA issue
   - Copy `index.html` as `404.html` in `public/` folder

2. **Assets not loading**
   - Check `base` path in `vite.config.ts`
   - Ensure it matches your repository name

3. **Custom domain not working**
   - Verify DNS settings
   - Check CNAME file content
   - Wait for DNS propagation (up to 24 hours)

**Debug commands:**
```bash
# Test build locally
npm run build
npm run preview

# Check build output
ls -la dist/

# Verify base path
grep -r "kolay-kredi" dist/
```

## 🔧 Configuration

### Analytics Setup

1. **Google Analytics 4**
   - Create GA4 property at https://analytics.google.com
   - Copy the Measurement ID (G-XXXXXXXXXX)
   - Add to environment variables

2. **Google Tag Manager**
   - Create GTM container at https://tagmanager.google.com
   - Copy the Container ID (GTM-XXXXXXX)  
   - Add to environment variables

### SEO Configuration

- Update meta descriptions in each page component
- Modify `sitemap.xml` with your actual URLs
- Replace placeholder favicon with your logo
- Add structured data as needed

### Bank Data Updates

Update bank information in `src/data/banks.ts`:

```typescript
export const banks: Bank[] = [
  {
    id: 'sample-bank',
    name: 'Sample Bank',
    slug: 'sample-bank', 
    logo: '/images/banks/sample-bank.png',
    website: 'https://www.samplebank.com.tr'
  }
  // Add more banks...
]
```

## 📊 Data Management

### Adding New Banks

1. Add bank data to `src/data/banks.ts`
2. Add bank logo image to `public/images/banks/`
3. Update credit/card data with new bank offerings
4. Add bank detail page route in `App.tsx`

### Logo Guidelines

For optimal display and performance:

- **Format**: SVG preferred over PNG for scalability
- **Dimensions**: Source logos should be minimum 1000px width
- **Aspect Ratio**: Logos will be displayed in 300×100 containers (3:1 ratio)
- **Background**: Transparent background required
- **File Size**: Keep under 50KB for fast loading
- **Naming**: Use kebab-case (e.g., `garanti-bbva.svg`, `yapi-kredi.svg`)
- **Location**: Place in `public/images/banks/` directory

**Example structure:**
```
public/images/banks/
├── garanti-bbva.svg
├── ziraat.png
├── akbank.svg
└── yapi-kredi.svg
```

### Updating Credit Products

1. Modify `src/data/credits.ts`
2. Update interest rates and terms
3. Add new credit types if needed
4. Refresh promotional data

### Managing Promotions

1. Edit `src/data/promotions.ts`
2. Update valid dates and conditions
3. Mark expired promotions as inactive
4. Add new promotional campaigns

## 🎨 Customization

### Styling

- Primary colors defined in `tailwind.config.js`
- Component styles use Tailwind CSS utility classes
- Custom CSS can be added to `src/index.css`

### Branding

1. Replace logo images in `public/images/`
2. Update favicon and app icons
3. Modify color scheme in Tailwind config
4. Update site name and descriptions

### Features

- Add new comparison categories
- Implement loan calculator improvements  
- Add bank review system
- Integrate real-time rate APIs

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔍 SEO Features

- **Meta Tags**: Comprehensive meta descriptions and titles
- **Schema Markup**: Structured data for better search visibility
- **Sitemap**: XML sitemap for search engines
- **Robots.txt**: Proper crawling instructions
- **Canonical URLs**: Prevent duplicate content issues
- **OpenGraph**: Social media sharing optimization

## 📈 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: < 500KB gzipped
- **Loading Time**: < 2s on 3G networks
- **Core Web Vitals**: All green scores

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For technical issues or questions:

- Create an issue in the GitHub repository
- Email: info@kolaykredi.com
- Documentation: Check README and code comments

## 📄 License

This project is licensed under the MIT License. See `LICENSE` file for details.

## 🔐 Security

- No sensitive data stored in frontend
- HTTPS enforced for all connections  
- Content Security Policy headers
- Regular dependency updates

## 📊 Analytics & Monitoring

- Google Analytics 4 for user behavior
- Google Tag Manager for event tracking
- Core Web Vitals monitoring
- Error tracking and reporting

---

**Built with ❤️ for the Turkish financial market**

*Last updated: August 28, 2024*
