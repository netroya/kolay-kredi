export interface Credit {
  id: string
  bank: string
  logo: string
  type: 'personal' | 'housing' | 'vehicle'
  interestRate: number
  maxAmount: number
  maxTerm: number
  minAge: number
  minIncome: number
  features: string[]
  requirements: string[]
  applicationUrl?: string
}

export const credits: Credit[] = [
  // Ziraat Bankası
  {
    id: 'ziraat-ihtiyac',
    bank: 'Ziraat Bankası',
    logo: '/images/banks/ziraat.svg',
    type: 'personal',
    interestRate: 3.45,
    maxAmount: 300000,
    maxTerm: 48,
    minAge: 18,
    minIncome: 4000,
    features: ['Düşük faiz', 'Esnek ödeme', 'Hızlı süreç'],
    requirements: ['SGK hizmet dökümü', 'Gelir belgesi']
  },
  {
    id: 'ziraat-konut',
    bank: 'Ziraat Bankası',
    logo: '/images/banks/ziraat.svg',
    type: 'housing',
    interestRate: 2.25,
    maxAmount: 2500000,
    maxTerm: 240,
    minAge: 18,
    minIncome: 7000,
    features: ['Kamu desteği', 'Uzun vade', 'Uygun faiz'],
    requirements: ['Gelir belgesi', 'Tapu bilgileri', 'Sigorta']
  },

  // VakıfBank
  {
    id: 'vakifbank-ihtiyac',
    bank: 'VakıfBank',
    logo: '/images/banks/vakifbank.svg',
    type: 'personal',
    interestRate: 3.29,
    maxAmount: 400000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 4500,
    features: ['Masrafsız kullandırım', 'Hızlı onay', 'Esnek ödeme'],
    requirements: ['Maaş bordrosu', 'Kimlik fotokopisi']
  },
  {
    id: 'vakifbank-tasit',
    bank: 'VakıfBank',
    logo: '/images/banks/vakifbank.svg',
    type: 'vehicle',
    interestRate: 2.49,
    maxAmount: 1500000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 6000,
    features: ['Araç sigortası dahil', 'Sıfır faiz kampanyası', 'Hızlı kredi'],
    requirements: ['Gelir belgesi', 'Araç bilgileri', 'Kasko sigortası']
  },

  // İş Bankası
  {
    id: 'isbank-ihtiyac',
    bank: 'İş Bankası',
    logo: '/images/banks/isbank.svg',
    type: 'personal',
    interestRate: 3.15,
    maxAmount: 500000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5000,
    features: ['Dijital başvuru', 'Anında pre-onay', 'Avantajlı faiz'],
    requirements: ['Maaş bordrosu', 'İkametgah belgesi']
  },
  {
    id: 'isbank-konut',
    bank: 'İş Bankası',
    logo: '/images/banks/isbank.svg',
    type: 'housing',
    interestRate: 2.05,
    maxAmount: 4000000,
    maxTerm: 240,
    minAge: 18,
    minIncome: 8000,
    features: ['Konut kredisi sigortası', 'Değerleme hizmeti', 'Uzun vade'],
    requirements: ['Gelir belgesi', 'Tapu raporu', 'Sigorta poliçesi']
  },

  // Yapı Kredi
  {
    id: 'yapi-kredi-ihtiyac',
    bank: 'Yapı Kredi',
    logo: '/images/banks/yapi-kredi.svg',
    type: 'personal',
    interestRate: 3.09,
    maxAmount: 600000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5500,
    features: ['Mobil onay', 'Hızlı kullandırım', 'Esnek geri ödeme'],
    requirements: ['Maaş bordrosu', 'Gelir belgesi']
  },
  {
    id: 'yapi-kredi-konut',
    bank: 'Yapı Kredi',
    logo: '/images/banks/yapi-kredi.svg',
    type: 'housing',
    interestRate: 2.15,
    maxAmount: 3000000,
    maxTerm: 180,
    minAge: 18,
    minIncome: 7500,
    features: ['Konut sigortası dahil', 'Esnek ödeme', 'Hızlı değerleme'],
    requirements: ['Maaş bordrosu', 'Emlak değerleme raporu']
  },

  // Garanti BBVA
  {
    id: 'garanti-ihtiyac',
    bank: 'Garanti BBVA',
    logo: '/images/banks/garanti-bbva.svg',
    type: 'personal',
    interestRate: 2.89,
    maxAmount: 500000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5000,
    features: ['Online başvuru', 'Hızlı onay', 'Masrafsız'],
    requirements: ['Maaş bordrosu', 'Kimlik fotokopisi']
  },
  {
    id: 'garanti-konut',
    bank: 'Garanti BBVA',
    logo: '/images/banks/garanti-bbva.svg',
    type: 'housing',
    interestRate: 1.89,
    maxAmount: 5000000,
    maxTerm: 240,
    minAge: 18,
    minIncome: 8000,
    features: ['Düşük faiz oranı', 'Uzun vade', 'Ekspertiz hizmeti'],
    requirements: ['Gelir belgesi', 'Tapu bilgileri', 'Sigorta']
  },

  // Akbank
  {
    id: 'akbank-ihtiyac',
    bank: 'Akbank',
    logo: '/images/banks/akbank.svg',
    type: 'personal',
    interestRate: 2.95,
    maxAmount: 750000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5500,
    features: ['Dijital başvuru', 'Anında sonuç', 'Avantajlı faiz'],
    requirements: ['Maaş bordrosu', 'İkametgah belgesi']
  },
  {
    id: 'akbank-tasit',
    bank: 'Akbank',
    logo: '/images/banks/akbank.svg',
    type: 'vehicle',
    interestRate: 2.35,
    maxAmount: 2000000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 6500,
    features: ['Sıfır araç kredisi', 'Kasko dahil', 'Hızlı onay'],
    requirements: ['Gelir belgesi', 'Araç faturası', 'Kasko poliçesi']
  },

  // QNB Finansbank
  {
    id: 'qnb-ihtiyac',
    bank: 'QNB Finansbank',
    logo: '/images/banks/qnb-finansbank.svg',
    type: 'personal',
    interestRate: 3.19,
    maxAmount: 450000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5000,
    features: ['Hızlı başvuru', 'Esnek ödeme', 'Rekabetçi faiz'],
    requirements: ['Maaş bordrosu', 'Kimlik belgesi']
  },
  {
    id: 'qnb-konut',
    bank: 'QNB Finansbank',
    logo: '/images/banks/qnb-finansbank.svg',
    type: 'housing',
    interestRate: 2.12,
    maxAmount: 3500000,
    maxTerm: 240,
    minAge: 18,
    minIncome: 7500,
    features: ['Konut değerleme hizmeti', 'Sigorta avantajları', 'Uzun vade'],
    requirements: ['Gelir belgesi', 'Emlak raporu', 'Sigorta']
  },

  // Halkbank
  {
    id: 'halkbank-ihtiyac',
    bank: 'Halkbank',
    logo: '/images/banks/halkbank.svg',
    type: 'personal',
    interestRate: 3.35,
    maxAmount: 350000,
    maxTerm: 48,
    minAge: 18,
    minIncome: 4200,
    features: ['Uygun faiz', 'Basit başvuru', 'Hızlı süreç'],
    requirements: ['Maaş bordrosu', 'SGK belgesi']
  },
  {
    id: 'halkbank-tasit',
    bank: 'Halkbank',
    logo: '/images/banks/halkbank.svg',
    type: 'vehicle',
    interestRate: 2.65,
    maxAmount: 1200000,
    maxTerm: 48,
    minAge: 18,
    minIncome: 5500,
    features: ['İkinci el araç kredisi', 'Esnek vade', 'Uygun faiz'],
    requirements: ['Gelir belgesi', 'Araç ekspertiz raporu']
  },

  // Enpara.com
  {
    id: 'enpara-ihtiyac',
    bank: 'Enpara.com',
    logo: '/images/banks/enpara.svg',
    type: 'personal',
    interestRate: 2.79,
    maxAmount: 400000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 4800,
    features: ['Dijital banka avantajı', 'Düşük masraf', 'Online süreç'],
    requirements: ['Dijital kimlik doğrulama', 'Gelir belgesi']
  },
  {
    id: 'enpara-konut',
    bank: 'Enpara.com',
    logo: '/images/banks/enpara.svg',
    type: 'housing',
    interestRate: 1.99,
    maxAmount: 2800000,
    maxTerm: 180,
    minAge: 18,
    minIncome: 7200,
    features: ['Dijital başvuru', 'Hızlı onay', 'Rekabetçi faiz'],
    requirements: ['Online gelir belgesi', 'Dijital tapu sorgu']
  },

  // ING
  {
    id: 'ing-ihtiyac',
    bank: 'ING',
    logo: '/images/banks/ing.svg',
    type: 'personal',
    interestRate: 2.85,
    maxAmount: 500000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5200,
    features: ['Basit başvuru', 'Hızlı karar', 'Şeffaf koşullar'],
    requirements: ['Maaş bordrosu', 'Kimlik belgesi']
  },
  {
    id: 'ing-tasit',
    bank: 'ING',
    logo: '/images/banks/ing.svg',
    type: 'vehicle',
    interestRate: 2.29,
    maxAmount: 1800000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 6200,
    features: ['Sıfır km avantajı', 'Hızlı onay', 'Esnek ödeme'],
    requirements: ['Gelir belgesi', 'Araç bilgileri', 'Sigorta']
  },

  // CEPTE TEB
  {
    id: 'cepte-teb-ihtiyac',
    bank: 'CEPTE TEB',
    logo: '/images/banks/cepte-teb.svg',
    type: 'personal',
    interestRate: 3.05,
    maxAmount: 400000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 4900,
    features: ['Mobil başvuru', 'Anında karar', '7/24 hizmet'],
    requirements: ['Mobil kimlik doğrulama', 'Gelir belgesi']
  },
  {
    id: 'cepte-teb-konut',
    bank: 'CEPTE TEB',
    logo: '/images/banks/cepte-teb.svg',
    type: 'housing',
    interestRate: 2.08,
    maxAmount: 3200000,
    maxTerm: 240,
    minAge: 18,
    minIncome: 7800,
    features: ['Mobil takip', 'Hızlı değerleme', 'Dijital süreç'],
    requirements: ['Gelir belgesi', 'Emlak raporu']
  },

  // Fibabanka
  {
    id: 'fibabanka-ihtiyac',
    bank: 'Fibabanka',
    logo: '/images/banks/fibabanka.svg',
    type: 'personal',
    interestRate: 2.99,
    maxAmount: 550000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 5300,
    features: ['Kişisel bankacı desteği', 'Özel faiz oranları', 'VIP hizmet'],
    requirements: ['Gelir belgesi', 'Referans bilgileri']
  },
  {
    id: 'fibabanka-tasit',
    bank: 'Fibabanka',
    logo: '/images/banks/fibabanka.svg',
    type: 'vehicle',
    interestRate: 2.45,
    maxAmount: 1600000,
    maxTerm: 60,
    minAge: 18,
    minIncome: 6800,
    features: ['Premium araç kredisi', 'Özel hizmet', 'Hızlı süreç'],
    requirements: ['Gelir belgesi', 'Araç değerleme raporu']
  }
]