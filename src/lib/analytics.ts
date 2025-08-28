// Google Analytics 4 & Google Tag Manager Integration

interface AnalyticsEvent {
  event_name: string
  event_category?: string
  event_label?: string
  value?: number
  custom_parameters?: Record<string, any>
}

interface CreditSearchEvent {
  amount: number
  term: number
  bank?: string
  credit_type?: string
}

interface PageViewEvent {
  page_title: string
  page_location: string
  page_referrer?: string
}

class Analytics {
  private isEnabled: boolean = false
  private gtmId: string = ''
  private gaId: string = ''

  constructor() {
    // Check if we're in production and analytics should be enabled
    this.isEnabled = import.meta.env.PROD && !!import.meta.env.VITE_GA_ID
    this.gtmId = import.meta.env.VITE_GTM_ID || ''
    this.gaId = import.meta.env.VITE_GA_ID || ''
  }

  // Initialize Google Tag Manager
  initializeGTM(): void {
    if (!this.isEnabled || !this.gtmId) return

    // Add GTM script to head
    const script1 = document.createElement('script')
    script1.async = true
    script1.src = `https://www.googletagmanager.com/gtm.js?id=${this.gtmId}`
    document.head.appendChild(script1)

    // Add GTM noscript to body
    const noscript = document.createElement('noscript')
    const iframe = document.createElement('iframe')
    iframe.src = `https://www.googletagmanager.com/ns.html?id=${this.gtmId}`
    iframe.height = '0'
    iframe.width = '0'
    iframe.style.display = 'none'
    iframe.style.visibility = 'hidden'
    noscript.appendChild(iframe)
    document.body.insertBefore(noscript, document.body.firstChild)

    // Initialize dataLayer
    ;(window as any).dataLayer = (window as any).dataLayer || []
    ;(window as any).dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    })
  }

  // Initialize Google Analytics 4
  initializeGA4(): void {
    if (!this.isEnabled || !this.gaId) return

    // Add GA4 script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.gaId}`
    document.head.appendChild(script)

    // Initialize gtag
    ;(window as any).gtag = function() {
      ;(window as any).dataLayer = (window as any).dataLayer || []
      ;(window as any).dataLayer.push(arguments)
    }

    ;(window as any).gtag('js', new Date())
    ;(window as any).gtag('config', this.gaId, {
      page_title: document.title,
      page_location: window.location.href
    })
  }

  // Track page view
  trackPageView(data: PageViewEvent): void {
    if (!this.isEnabled) return

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'page_view', {
        page_title: data.page_title,
        page_location: data.page_location,
        page_referrer: data.page_referrer || document.referrer
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: 'page_view',
        page_title: data.page_title,
        page_location: data.page_location,
        page_referrer: data.page_referrer || document.referrer
      })
    }
  }

  // Track credit search
  trackCreditSearch(data: CreditSearchEvent): void {
    if (!this.isEnabled) return

    const eventData = {
      event: 'credit_search',
      credit_amount: data.amount,
      credit_term: data.term,
      selected_bank: data.bank || 'all',
      credit_type: data.credit_type || 'personal',
      value: data.amount
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'search', {
        search_term: `${data.amount} TL ${data.term} ay`,
        content_category: 'credit',
        content_id: `credit_${data.amount}_${data.term}`,
        value: data.amount,
        currency: 'TRY'
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Track bank click
  trackBankClick(bankName: string, bankSlug: string, context: string = 'listing'): void {
    if (!this.isEnabled) return

    const eventData = {
      event: 'bank_click',
      bank_name: bankName,
      bank_slug: bankSlug,
      click_context: context,
      event_category: 'engagement',
      event_label: bankName
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'select_content', {
        content_type: 'bank',
        content_id: bankSlug,
        content_category: context
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Track form submission
  trackFormSubmission(formType: string, formData?: Record<string, any>): void {
    if (!this.isEnabled) return

    const eventData = {
      event: 'form_submit',
      form_type: formType,
      event_category: 'form',
      event_label: formType,
      ...formData
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'generate_lead', {
        content_category: formType,
        value: 1,
        currency: 'TRY'
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Track file download
  trackDownload(fileName: string, fileType: string = 'pdf'): void {
    if (!this.isEnabled) return

    const eventData = {
      event: 'file_download',
      file_name: fileName,
      file_type: fileType,
      event_category: 'download',
      event_label: fileName
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'select_content', {
        content_type: 'file',
        content_id: fileName,
        content_category: 'download'
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Track external link click
  trackExternalLink(url: string, linkText: string = '', context: string = 'content'): void {
    if (!this.isEnabled) return

    const eventData = {
      event: 'external_link_click',
      link_url: url,
      link_text: linkText,
      link_context: context,
      event_category: 'outbound',
      event_label: url
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'click', {
        link_url: url,
        content_category: 'external_link',
        content_id: url
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Track scroll depth
  trackScrollDepth(percentage: number): void {
    if (!this.isEnabled) return

    // Only track at 25%, 50%, 75%, 100%
    const milestones = [25, 50, 75, 100]
    if (!milestones.includes(percentage)) return

    const eventData = {
      event: 'scroll_depth',
      scroll_percentage: percentage,
      event_category: 'engagement',
      event_label: `${percentage}%`
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', 'scroll', {
        percent_scrolled: percentage
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Track video interaction
  trackVideo(action: 'play' | 'pause' | 'complete', videoTitle: string): void {
    if (!this.isEnabled) return

    const eventData = {
      event: `video_${action}`,
      video_title: videoTitle,
      event_category: 'video',
      event_label: videoTitle
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', `video_${action}`, {
        video_title: videoTitle,
        content_type: 'video'
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Custom event tracking
  trackCustomEvent(event: AnalyticsEvent): void {
    if (!this.isEnabled) return

    const eventData = {
      event: event.event_name,
      event_category: event.event_category || 'custom',
      event_label: event.event_label || '',
      value: event.value || 1,
      ...event.custom_parameters
    }

    if ((window as any).gtag) {
      ;(window as any).gtag('event', event.event_name, {
        event_category: event.event_category,
        event_label: event.event_label,
        value: event.value,
        ...event.custom_parameters
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push(eventData)
    }
  }

  // Set user properties
  setUserProperty(property: string, value: string | number): void {
    if (!this.isEnabled) return

    if ((window as any).gtag) {
      ;(window as any).gtag('config', this.gaId, {
        custom_map: { [property]: value }
      })
    }

    if ((window as any).dataLayer) {
      ;(window as any).dataLayer.push({
        event: 'user_property_set',
        user_property: property,
        user_value: value
      })
    }
  }

  // Initialize all analytics
  initialize(): void {
    if (!this.isEnabled) {
      console.log('Analytics disabled in development mode')
      return
    }

    this.initializeGTM()
    this.initializeGA4()

    // Set up scroll tracking
    this.setupScrollTracking()
    
    console.log('Analytics initialized successfully')
  }

  // Setup automatic scroll tracking
  private setupScrollTracking(): void {
    if (!this.isEnabled) return

    let scrollTimeout: NodeJS.Timeout
    const scrollMilestones: Set<number> = new Set()

    const handleScroll = () => {
      clearTimeout(scrollTimeout)
      scrollTimeout = setTimeout(() => {
        const scrollPercentage = Math.round(
          (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
        )

        // Track milestones
        [25, 50, 75, 100].forEach(milestone => {
          if (scrollPercentage >= milestone && !scrollMilestones.has(milestone)) {
            scrollMilestones.add(milestone)
            this.trackScrollDepth(milestone)
          }
        })
      }, 250)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
  }
}

// Create singleton instance
const analytics = new Analytics()

// Export analytics instance and helper functions
export default analytics

// Helper hooks and functions for React components
export const useAnalytics = () => {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackCreditSearch: analytics.trackCreditSearch.bind(analytics),
    trackBankClick: analytics.trackBankClick.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackExternalLink: analytics.trackExternalLink.bind(analytics),
    trackCustomEvent: analytics.trackCustomEvent.bind(analytics),
    setUserProperty: analytics.setUserProperty.bind(analytics)
  }
}

// Auto-initialize when module is imported
if (typeof window !== 'undefined') {
  analytics.initialize()
}