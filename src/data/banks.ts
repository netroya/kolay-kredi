export type BankLogo = {
  slug: string;
  name: string;
  logo: string;
  bgPref: "light" | "dark" | "any";
  homepage?: string;
  logoVerified?: boolean;
  logoSourceUrl?: string;
  logoLastChecked?: string;
}

export interface Bank {
  id: string
  name: string
  slug: string
  logo: string
  website: string
  phone: string
  founded: number
  description: string
  features: string[]
  customerServiceRating: number
  digitalBankingRating: number
}

export const BANKS: BankLogo[] = [
  {
    slug: "ziraat", 
    name: "Ziraat Bankası", 
    logo: "/logos/ziraat-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.ziraatbank.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.ziraatbank.com.tr/tr/kurumsal/hakkimizda/basin-odasi/gorseller"
  },
  {
    slug: "vakifbank", 
    name: "VakıfBank", 
    logo: "/logos/vakifbank-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.vakifbank.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.vakifbank.com.tr/logolarimiz.aspx"
  },
  {
    slug: "isbank", 
    name: "Türkiye İş Bankası", 
    logo: "/logos/isbank-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.isbank.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.isbank.com.tr/bankamizi-taniyin/basin-aciklamasi"
  },
  {
    slug: "yapikredi", 
    name: "Yapı Kredi", 
    logo: "/logos/yapikredi-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.yapikredi.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.yapikredi.com.tr/yapi-kredi-hakkinda/iletisim"
  },
  {
    slug: "garanti-bbva", 
    name: "Garanti BBVA", 
    logo: "/logos/garanti-bbva-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.garantibbva.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.garantibbva.com.tr/en/corporate-communications"
  },
  {
    slug: "akbank", 
    name: "Akbank", 
    logo: "/logos/akbank-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.akbank.com",
    logoVerified: false,
    logoSourceUrl: "https://www.akbank.com/en/about-us/support-center/contact-information"
  },
  {
    slug: "qnb-finansbank", 
    name: "QNB Finansbank", 
    logo: "/logos/qnb-finansbank-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.qnb.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.qnb.com.tr/qnbyi-taniyin/basin-odasi/logolar-ve-diger-gorseller"
  },
  {
    slug: "halkbank", 
    name: "Halkbank", 
    logo: "/logos/halkbank-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.halkbank.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.halkbank.com.tr/tr/bilgi-toplumu-hizmetleri/banka-bilgileri.html"
  },
  {
    slug: "ing", 
    name: "ING", 
    logo: "/logos/ing-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.ing.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.ing.com.tr/en/corporate-identity/corporate-logo-gallery"
  },
  {
    slug: "enpara", 
    name: "Enpara.com", 
    logo: "/logos/enpara-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.enpara.com",
    logoVerified: false,
    logoSourceUrl: "https://www.enpara.com/hakkimizda"
  },
  {
    slug: "teb", 
    name: "TEB", 
    logo: "/logos/banks/teb.png", 
    bgPref: "light", 
    homepage: "https://www.teb.com.tr",
    logoVerified: true,
    logoSourceUrl: "https://www.teb.com.tr/hakkimizda/basin-merkezi",
    logoLastChecked: "2025-08-29"
  },
  {
    slug: "cepteteb", 
    name: "CEPTETEB", 
    logo: "/logos/cepteteb-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.cepteteb.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.teb.com.tr/hakkimizda/basin-merkezi"
  },
  {
    slug: "fibabanka", 
    name: "Fibabanka", 
    logo: "/logos/fibabanka-placeholder.svg", 
    bgPref: "light", 
    homepage: "https://www.fibabanka.com.tr",
    logoVerified: false,
    logoSourceUrl: "https://www.fibabanka.com.tr/hakkimizda/kurumsal-iletisim/gorsel-galeri/fibabanka-logo-yeni"
  }
];

export const banks: Bank[] = [
  {
    id: 'ziraat',
    name: 'Ziraat Bankası',
    slug: 'ziraat-bankasi',
    logo: '/logos/placeholder.svg',
    website: 'https://www.ziraatbank.com.tr',
    phone: '444 0 100',
    founded: 1863,
    description: 'Türkiye\'nin en köklü ve güvenilir bankası. 160 yıllık tecrübesiyle tüm bankacılık hizmetlerini sunar.',
    features: ['Geniş şube ağı', 'Uygun faiz oranları', 'Güvenilir hizmet', 'Kapsamlı ürün yelpazesi'],
    customerServiceRating: 4.2,
    digitalBankingRating: 3.8
  },
  {
    id: 'vakifbank',
    name: 'VakıfBank',
    slug: 'vakifbank',
    logo: '/logos/placeholder.svg',
    website: 'https://www.vakifbank.com.tr',
    phone: '444 0 724',
    founded: 1954,
    description: 'Türkiye\'nin önde gelen kamu bankalarından biri. Güvenilir ve uygun maliyetli bankacılık çözümleri.',
    features: ['Düşük faiz oranları', 'Geniş ATM ağı', 'Kampanyalı krediler', 'Kolay başvuru'],
    customerServiceRating: 4.1,
    digitalBankingRating: 3.9
  },
  {
    id: 'isbank',
    name: 'İş Bankası',
    slug: 'isbank',
    logo: '/logos/placeholder.svg',
    website: 'https://www.isbank.com.tr',
    phone: '444 0 724',
    founded: 1924,
    description: 'Türkiye\'nin ilk milli bankası. 99 yıllık deneyimiyle kurumsal ve bireysel bankacılık hizmetleri.',
    features: ['Dijital bankacılık', 'Uzman kadro', 'Yenilikçi ürünler', 'Güçlü altyapı'],
    customerServiceRating: 4.3,
    digitalBankingRating: 4.2
  },
  {
    id: 'yapi-kredi',
    name: 'Yapı Kredi',
    slug: 'yapi-kredi',
    logo: '/logos/placeholder.svg',
    website: 'https://www.yapikredi.com.tr',
    phone: '444 0 200',
    founded: 1944,
    description: 'Yenilikçi bankacılık anlayışıyla öne çıkan özel banka. Kişiselleştirilmiş hizmetler sunar.',
    features: ['Yenilikçi ürünler', 'Hızlı onay', 'Mobil bankacılık', 'Avantajlı kampanyalar'],
    customerServiceRating: 4.0,
    digitalBankingRating: 4.4
  },
  {
    id: 'garanti-bbva',
    name: 'Garanti BBVA',
    slug: 'garanti-bbva',
    logo: '/logos/placeholder.svg',
    website: 'https://www.garantibbva.com.tr',
    phone: '444 0 333',
    founded: 1946,
    description: 'Dijital dönüşümde öncü banka. Müşteri odaklı yaklaşımıyla bankacılığı yeniden tanımlıyor.',
    features: ['Dijital öncülük', 'Hızlı işlem', 'Geniş ürün yelpazesi', 'Uluslararası hizmet'],
    customerServiceRating: 4.4,
    digitalBankingRating: 4.6
  },
  {
    id: 'akbank',
    name: 'Akbank',
    slug: 'akbank',
    logo: '/logos/placeholder.svg',
    website: 'https://www.akbank.com',
    phone: '444 0 900',
    founded: 1948,
    description: 'Müşteri memnuniyetini önceleyen, yenilikçi bankacılık çözümleri sunan öncü banka.',
    features: ['Müşteri odaklı', 'Hızlı hizmet', 'Kapsamlı dijital platform', 'Rekabetçi oranlar'],
    customerServiceRating: 4.3,
    digitalBankingRating: 4.5
  },
  {
    id: 'qnb-finansbank',
    name: 'QNB Finansbank',
    slug: 'qnb-finansbank',
    logo: '/logos/placeholder.svg',
    website: 'https://www.qnbfinansbank.com',
    phone: '444 0 700',
    founded: 1987,
    description: 'Güçlü sermaye yapısı ve uluslararası deneyimiyle öne çıkan banka.',
    features: ['Uluslararası bağlantı', 'Güçlü sermaye', 'Özel bankacılık', 'İnovatif çözümler'],
    customerServiceRating: 4.1,
    digitalBankingRating: 4.0
  },
  {
    id: 'halkbank',
    name: 'Halkbank',
    slug: 'halkbank',
    logo: '/logos/placeholder.svg',
    website: 'https://www.halkbank.com.tr',
    phone: '444 0 400',
    founded: 1938,
    description: 'Halkın bankası olarak bilinen, erişilebilir ve uygun maliyetli bankacılık hizmetleri.',
    features: ['Halka yakın', 'Uygun krediler', 'Geniş erişim', 'Sosyal sorumluluk'],
    customerServiceRating: 3.9,
    digitalBankingRating: 3.7
  },
  {
    id: 'enpara',
    name: 'Enpara.com',
    slug: 'enpara',
    logo: '/logos/placeholder.svg',
    website: 'https://www.enpara.com',
    phone: '444 0 365',
    founded: 2012,
    description: 'Türkiye\'nin dijital bankası. İnternetten hızlı, güvenli ve uygun maliyetli bankacılık.',
    features: ['Dijital banka', 'Düşük masraf', '7/24 hizmet', 'Hızlı işlemler'],
    customerServiceRating: 4.2,
    digitalBankingRating: 4.7
  },
  {
    id: 'ing',
    name: 'ING',
    slug: 'ing',
    logo: '/logos/placeholder.svg',
    website: 'https://www.ing.com.tr',
    phone: '444 0 464',
    founded: 2007,
    description: 'Uluslararası deneyimi olan, müşteri odaklı dijital bankacılık çözümleri sunan banka.',
    features: ['Uluslararası tecrübe', 'Dijital odak', 'Basit bankacılık', 'Şeffaf ücretlendirme'],
    customerServiceRating: 4.4,
    digitalBankingRating: 4.6
  },
  {
    id: 'cepte-teb',
    name: 'CEPTE TEB',
    slug: 'cepte-teb',
    logo: '/logos/placeholder.svg',
    website: 'https://www.teb.com.tr',
    phone: '444 0 832',
    founded: 1927,
    description: 'Mobil odaklı bankacılık deneyimi sunan, teknoloji ile güçlendirilmiş banka.',
    features: ['Mobil öncelikli', 'Hızlı onay', 'Teknoloji odaklı', 'Kullanıcı dostu'],
    customerServiceRating: 4.0,
    digitalBankingRating: 4.3
  },
  {
    id: 'fibabanka',
    name: 'Fibabanka',
    slug: 'fibabanka',
    logo: '/logos/placeholder.svg',
    website: 'https://www.fibabanka.com.tr',
    phone: '444 0 342',
    founded: 1984,
    description: 'Kişiselleştirilmiş bankacılık hizmetleri sunan, müşteri memnuniyeti odaklı banka.',
    features: ['Kişisel bankacı', 'Özel hizmet', 'Esnek çözümler', 'Hızlı karar'],
    customerServiceRating: 4.2,
    digitalBankingRating: 3.9
  }
]