import React from 'react'
import { Helmet } from 'react-helmet-async'

interface SEOProps {
  title: string
  description: string
  path: string
  breadcrumbs?: Array<{ name: string; url: string }>
  type?: 'website' | 'article'
  image?: string
  schemaData?: object
}

const SEO: React.FC<SEOProps> = ({
  title,
  description,
  path,
  breadcrumbs = [],
  type = 'website',
  image = '/images/og-image.jpg',
  schemaData
}) => {
  const siteUrl = 'https://netroya.github.io/kolay-kredi'
  const fullUrl = `${siteUrl}${path}`
  const fullTitle = path === '/' ? title : `${title} - Kolay Kredi`

  // Generate breadcrumb JSON-LD
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Ana Sayfa",
        "item": siteUrl
      },
      ...breadcrumbs.map((crumb, index) => ({
        "@type": "ListItem",
        "position": index + 2,
        "name": crumb.name,
        "item": `${siteUrl}${crumb.url}`
      }))
    ]
  }

  // Default organization schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Kolay Kredi",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "description": "Türkiye'nin en kapsamlı kredi ve finansal ürün karşılaştırma platformu",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": ["Turkish"],
      "url": `${siteUrl}/iletisim`
    },
    "sameAs": [
      "https://www.linkedin.com/company/kolay-kredi",
      "https://twitter.com/kolaykredi"
    ]
  }

  // Combine all schemas
  const allSchemas = [
    organizationSchema,
    breadcrumbSchema,
    ...(schemaData ? [schemaData] : [])
  ]

  return (
    <Helmet>
      {/* Basic SEO */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:site_name" content="Kolay Kredi" />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:locale" content="tr_TR" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kolaykredi" />
      <meta name="twitter:creator" content="@kolaykredi" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />
      <meta name="twitter:image:alt" content={title} />

      {/* Additional SEO meta tags */}
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Kolay Kredi" />
      <meta name="publisher" content="Kolay Kredi" />
      <meta name="language" content="Turkish" />
      <meta name="geo.region" content="TR" />
      <meta name="geo.country" content="Turkey" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": allSchemas
        })}
      </script>
    </Helmet>
  )
}

export default SEO