export interface Promotion {
  id: string
  bank: string
  title: string
  description: string
  type: 'pension' | 'salary' | 'deposit' | 'digital' | 'student' | 'special'
  amount: number
  conditions: string[]
  validUntil: string
  minSalary?: number
  minAge?: number
  maxAge?: number
  featured: boolean
  logo: string
}

export const promotions: Promotion[] = [
  // Ziraat Bankası
  {
    id: 'ziraat-maas-promosyon',
    bank: 'Ziraat Bankası',
    title: 'Maaş Promosyon Avantajı',
    description: 'Maaşınızı Ziraat Bankası\'na geçirin, 12.000 TL promosyon kazanın',
    type: 'salary',
    amount: 12000,
    conditions: [
      'Maaş promesinin bankamıza geçirilmesi',
      'En az 10.000 TL maaş',
      '6 ay boyunca maaş ödemesi alınması'
    ],
    validUntil: '2024-11-30',
    minSalary: 10000,
    featured: true,
    logo: '/images/banks/ziraat.svg'
  },
  {
    id: 'ziraat-emekli-promosyon',
    bank: 'Ziraat Bankası',
    title: 'Emekli Promosyon Kampanyası',
    description: 'Emekli maaşınızı getirin, 15.000 TL promosyon kazanın',
    type: 'pension',
    amount: 15000,
    conditions: [
      'Emekli maaş promesi',
      'En az 8.000 TL maaş',
      'İlk 6 ay aktif kullanım'
    ],
    validUntil: '2024-12-31',
    minSalary: 8000,
    minAge: 60,
    featured: true,
    logo: '/images/banks/ziraat.svg'
  },

  // VakıfBank
  {
    id: 'vakifbank-maas-getir',
    bank: 'VakıfBank',
    title: 'Maaş Getir Kampanyası',
    description: 'Maaşınızı VakıfBank\'a taşıyın, 14.000 TL promosyon kazanın',
    type: 'salary',
    amount: 14000,
    conditions: [
      'Maaş promesi devri',
      'En az 12.000 TL maaş',
      '12 ay süreyle maaş ödemesi'
    ],
    validUntil: '2024-12-31',
    minSalary: 12000,
    featured: true,
    logo: '/images/banks/vakifbank.svg'
  },
  {
    id: 'vakifbank-emekli-ozel',
    bank: 'VakıfBank',
    title: 'Emekliler İçin Özel Kampanya',
    description: 'Emekli maaşınızı VakıfBank\'a getirin, avantajları yakalayın',
    type: 'pension',
    amount: 18000,
    conditions: [
      'Emekli maaş promesi',
      'En az 9.000 TL maaş',
      'İlk 6 ay aktif kullanım'
    ],
    validUntil: '2024-11-15',
    minSalary: 9000,
    minAge: 60,
    featured: false,
    logo: '/images/banks/vakifbank.svg'
  },

  // İş Bankası
  {
    id: 'isbank-mevduat-promosyon',
    bank: 'İş Bankası',
    title: 'Mevduat Promosyon Fırsatı',
    description: 'Yeni mevduat hesabı açın, 10.000 TL promosyon kazanın',
    type: 'deposit',
    amount: 10000,
    conditions: [
      'En az 100.000 TL mevduat',
      '6 ay boyunca hesapta tutulması',
      'Yeni müşteri olma şartı'
    ],
    validUntil: '2024-10-31',
    featured: true,
    logo: '/images/banks/isbank.svg'
  },
  {
    id: 'isbank-maas-promosyon',
    bank: 'İş Bankası',
    title: 'İş Bankası Maaş Promosyonu',
    description: 'Maaşınızı İş Bankası\'na getirin, 11.000 TL kazanın',
    type: 'salary',
    amount: 11000,
    conditions: [
      'Maaş promesi transferi',
      'En az 13.000 TL maaş',
      '8 ay maaş ödemesi'
    ],
    validUntil: '2024-11-30',
    minSalary: 13000,
    featured: false,
    logo: '/images/banks/isbank.svg'
  },

  // Yapı Kredi
  {
    id: 'yapi-kredi-dijital-promosyon',
    bank: 'Yapı Kredi',
    title: 'Dijital Bankacılık Promosyonu',
    description: 'Dijital kanallardan başvuru yapın, 8.000 TL promosyon kazanın',
    type: 'digital',
    amount: 8000,
    conditions: [
      'Mobile veya internet üzerinden başvuru',
      'İlk 3 ay içinde 5 farklı işlem',
      'Kredi kartı kullanımı'
    ],
    validUntil: '2024-12-15',
    featured: true,
    logo: '/images/banks/yapi-kredi.svg'
  },
  {
    id: 'yapi-kredi-maas-promosyon',
    bank: 'Yapı Kredi',
    title: 'Yapı Kredi Maaş Avantajı',
    description: 'Maaş müşterilerine özel 9.500 TL promosyon fırsatı',
    type: 'salary',
    amount: 9500,
    conditions: [
      'Maaş promesi devri',
      'En az 11.000 TL maaş',
      '6 ay maaş ödemesi'
    ],
    validUntil: '2024-12-31',
    minSalary: 11000,
    featured: false,
    logo: '/images/banks/yapi-kredi.svg'
  },

  // Garanti BBVA
  {
    id: 'garanti-emekli-promosyon-2024',
    bank: 'Garanti BBVA',
    title: 'Emekli Promosyon Kampanyası',
    description: 'Yeni emekli müşterilerimiz için özel 16.000 TL promosyon fırsatı',
    type: 'pension',
    amount: 16000,
    conditions: [
      'Yeni emekli olmuş olmak',
      'Maaş promesinin bankamızda olması',
      'En az 3 ay maaş ödemesi alınması'
    ],
    validUntil: '2024-12-31',
    minAge: 60,
    featured: true,
    logo: '/images/banks/garanti-bbva.svg'
  },
  {
    id: 'garanti-dijital-promosyon',
    bank: 'Garanti BBVA',
    title: 'Garanti BBVA Dijital Avantajı',
    description: 'Dijital bankacılık kullanıcılarına özel promosyon',
    type: 'digital',
    amount: 7000,
    conditions: [
      'Mobile app üzerinden başvuru',
      'İlk 2 ay aktif kullanım',
      'En az 3 farklı ürün kullanımı'
    ],
    validUntil: '2024-11-30',
    featured: false,
    logo: '/images/banks/garanti-bbva.svg'
  },

  // Akbank
  {
    id: 'akbank-genç-promosyon',
    bank: 'Akbank',
    title: 'Genç Müşteri Özel Promosyonu',
    description: '18-30 yaş arası müşteriler için 6.000 TL özel fırsatlar',
    type: 'student',
    amount: 6000,
    conditions: [
      '18-30 yaş aralığında olmak',
      'İlk kez banka müşterisi olmak',
      'Aktif hesap kullanımı'
    ],
    validUntil: '2024-12-31',
    minAge: 18,
    maxAge: 30,
    featured: false,
    logo: '/images/banks/akbank.svg'
  },
  {
    id: 'akbank-maas-promosyon',
    bank: 'Akbank',
    title: 'Akbank Maaş Promosyonu',
    description: 'Maaşınızı Akbank\'a taşıyın, 13.500 TL kazanın',
    type: 'salary',
    amount: 13500,
    conditions: [
      'Maaş promesi transferi',
      'En az 14.000 TL maaş',
      '10 ay maaş ödemesi'
    ],
    validUntil: '2024-12-31',
    minSalary: 14000,
    featured: true,
    logo: '/images/banks/akbank.svg'
  },

  // QNB Finansbank
  {
    id: 'qnb-maaş-promosyon',
    bank: 'QNB Finansbank',
    title: 'QNB Maaş Müşteri Avantajı',
    description: 'Maaş müşterilerimize özel 10.500 TL promosyon',
    type: 'salary',
    amount: 10500,
    conditions: [
      'Maaş promesi devri',
      'En az 12.500 TL maaş',
      '9 ay maaş ödemesi'
    ],
    validUntil: '2024-11-30',
    minSalary: 12500,
    featured: false,
    logo: '/images/banks/qnb-finansbank.svg'
  },
  {
    id: 'qnb-dijital-promosyon',
    bank: 'QNB Finansbank',
    title: 'QNB Dijital Bankacılık Fırsatı',
    description: 'Dijital kanalları kullanın, 8.500 TL promosyon kazanın',
    type: 'digital',
    amount: 8500,
    conditions: [
      'Mobile banking aktif kullanımı',
      'İlk 3 ay en az 8 işlem',
      'Dijital ürün kullanımı'
    ],
    validUntil: '2024-12-15',
    featured: false,
    logo: '/images/banks/qnb-finansbank.svg'
  },

  // Halkbank
  {
    id: 'halkbank-emekli-ozel',
    bank: 'Halkbank',
    title: 'Halkbank Emekli Kampanyası',
    description: 'Emekli maaşınızı Halkbank\'a getirin, 17.000 TL kazanın',
    type: 'pension',
    amount: 17000,
    conditions: [
      'Emekli maaş promesi',
      'En az 7.500 TL maaş',
      'İlk 6 ay aktif kullanım'
    ],
    validUntil: '2024-11-15',
    minSalary: 7500,
    minAge: 60,
    featured: true,
    logo: '/images/banks/halkbank.svg'
  },
  {
    id: 'halkbank-maaş-promosyon',
    bank: 'Halkbank',
    title: 'Halkbank Maaş Avantajı',
    description: 'Maaş müşterilerine özel 9.000 TL promosyon',
    type: 'salary',
    amount: 9000,
    conditions: [
      'Maaş promesi transferi',
      'En az 10.000 TL maaş',
      '7 ay maaş ödemesi'
    ],
    validUntil: '2024-12-31',
    minSalary: 10000,
    featured: false,
    logo: '/images/banks/halkbank.svg'
  },

  // Enpara.com
  {
    id: 'enpara-dijital-promosyon',
    bank: 'Enpara.com',
    title: 'Enpara Dijital Avantajı',
    description: 'Dijital bankanın avantajlarını keşfedin, 5.500 TL kazanın',
    type: 'digital',
    amount: 5500,
    conditions: [
      'Online hesap açma',
      '7/24 dijital bankacılık',
      'İlk 3 ay aktif kullanım'
    ],
    validUntil: '2024-12-31',
    featured: false,
    logo: '/images/banks/enpara.svg'
  },

  // ING
  {
    id: 'ing-turuncu-promosyon',
    bank: 'ING',
    title: 'ING Turuncu Hesap Avantajı',
    description: 'Turuncu Hesap açın, 6.500 TL hoşgeldin bonusu alın',
    type: 'special',
    amount: 6500,
    conditions: [
      'Turuncu Hesap açma',
      'İlk ay en az 5 işlem',
      'Aktif hesap kullanımı'
    ],
    validUntil: '2024-11-30',
    featured: false,
    logo: '/images/banks/ing.svg'
  },

  // CEPTE TEB
  {
    id: 'cepte-teb-mobil-promosyon',
    bank: 'CEPTE TEB',
    title: 'CEPTE TEB Mobil Avantajı',
    description: 'Mobil bankacılığın gücüyle 7.500 TL promosyon',
    type: 'digital',
    amount: 7500,
    conditions: [
      'Mobil app indirme ve kullanım',
      'İlk 2 ay en az 6 işlem',
      'BonusFlaş kart kullanımı'
    ],
    validUntil: '2024-12-15',
    featured: false,
    logo: '/images/banks/cepte-teb.svg'
  },

  // Fibabanka
  {
    id: 'fibabanka-premium-promosyon',
    bank: 'Fibabanka',
    title: 'Fibabanka Premium Müşteri Avantajı',
    description: 'Premium hizmet paketimizle 12.000 TL promosyon',
    type: 'special',
    amount: 12000,
    conditions: [
      'Premium hesap açma',
      'Kişisel bankacı hizmeti',
      'En az 50.000 TL işlem hacmi'
    ],
    validUntil: '2024-12-31',
    featured: false,
    logo: '/images/banks/fibabanka.svg'
  }
]

export const getPromotionsByType = (type: Promotion['type']): Promotion[] => {
  return promotions.filter(promo => promo.type === type)
}

export const getFeaturedPromotions = (): Promotion[] => {
  return promotions.filter(promo => promo.featured)
}

export const getPromotionById = (id: string): Promotion | undefined => {
  return promotions.find(promo => promo.id === id)
}

export const getPromotionsByBank = (bankSlug: string): Promotion[] => {
  return promotions.filter(promo => 
    promo.bank.toLowerCase().replace(/[^a-z0-9]/g, '-') === bankSlug
  )
}