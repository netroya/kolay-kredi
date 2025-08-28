export interface Fee {
  id: string
  bank: string
  category: 'account' | 'card' | 'transfer' | 'loan' | 'other'
  name: string
  amount: number | 'variable'
  description: string
  frequency: 'monthly' | 'yearly' | 'per-transaction' | 'one-time'
  conditions?: string[]
  logo: string
}

export const fees: Fee[] = [
  // Ziraat Bankası
  {
    id: 'ziraat-hesap-isletim',
    bank: 'Ziraat Bankası',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 20,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['3.000 TL altı ortalama bakiye için'],
    logo: '/images/banks/ziraat.svg'
  },
  {
    id: 'ziraat-eft-havale',
    bank: 'Ziraat Bankası',
    category: 'transfer',
    name: 'EFT/Havale Ücreti',
    amount: 12,
    description: 'Başka bankaya para transferi ücreti',
    frequency: 'per-transaction',
    conditions: ['İlk 5 işlem ücretsiz'],
    logo: '/images/banks/ziraat.svg'
  },

  // VakıfBank
  {
    id: 'vakifbank-hesap-isletim',
    bank: 'VakıfBank',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 22,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['4.000 TL altı ortalama bakiye için'],
    logo: '/images/banks/vakifbank.svg'
  },
  {
    id: 'vakifbank-kredi-tahsis',
    bank: 'VakıfBank',
    category: 'loan',
    name: 'Kredi Tahsis Ücreti',
    amount: 'variable',
    description: 'Kredinin %2\'si kadar tahsis ücreti',
    frequency: 'one-time',
    conditions: ['Minimum 500 TL', 'Maksimum 10.000 TL'],
    logo: '/images/banks/vakifbank.svg'
  },

  // İş Bankası
  {
    id: 'isbank-hesap-isletim',
    bank: 'İş Bankası',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 28,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['6.000 TL altı ortalama bakiye için'],
    logo: '/images/banks/isbank.svg'
  },
  {
    id: 'isbank-kart-yillik',
    bank: 'İş Bankası',
    category: 'card',
    name: 'Kredi Kartı Yıllık Ücreti',
    amount: 180,
    description: 'Standart kredi kartı yıllık ücreti',
    frequency: 'yearly',
    conditions: ['Yıllık 30.000 TL harcama ile muafiyet'],
    logo: '/images/banks/isbank.svg'
  },

  // Yapı Kredi
  {
    id: 'yapi-kredi-hesap-isletim',
    bank: 'Yapı Kredi',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 32,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['8.000 TL altı ortalama bakiye için'],
    logo: '/images/banks/yapi-kredi.svg'
  },
  {
    id: 'yapi-kredi-kart-yillik',
    bank: 'Yapı Kredi',
    category: 'card',
    name: 'Kredi Kartı Yıllık Ücreti',
    amount: 200,
    description: 'Standart kredi kartı yıllık ücreti',
    frequency: 'yearly',
    conditions: ['Yıllık 40.000 TL harcama ile muafiyet'],
    logo: '/images/banks/yapi-kredi.svg'
  },

  // Garanti BBVA
  {
    id: 'garanti-hesap-isletim',
    bank: 'Garanti BBVA',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 25,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['5.000 TL altı ortalama bakiye için'],
    logo: '/images/banks/garanti-bbva.svg'
  },
  {
    id: 'garanti-kredi-karti-yillik',
    bank: 'Garanti BBVA',
    category: 'card',
    name: 'Kredi Kartı Yıllık Ücreti',
    amount: 240,
    description: 'Standart kredi kartı yıllık ücreti',
    frequency: 'yearly',
    conditions: ['İlk yıl ücretsiz', 'Yıllık 50.000 TL harcama şartı'],
    logo: '/images/banks/garanti-bbva.svg'
  },
  {
    id: 'garanti-eft-havale',
    bank: 'Garanti BBVA',
    category: 'transfer',
    name: 'EFT/Havale Ücreti',
    amount: 15,
    description: 'Başka bankaya para transferi ücreti',
    frequency: 'per-transaction',
    conditions: ['Digital kanallar için 10 TL'],
    logo: '/images/banks/garanti-bbva.svg'
  },

  // Akbank
  {
    id: 'akbank-hesap-isletim',
    bank: 'Akbank',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 30,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['7.500 TL altı ortalama bakiye için'],
    logo: '/images/banks/akbank.svg'
  },
  {
    id: 'akbank-fast-transfer',
    bank: 'Akbank',
    category: 'transfer',
    name: 'FAST Para Transferi',
    amount: 8,
    description: '7/24 anında para transferi ücreti',
    frequency: 'per-transaction',
    conditions: ['100.000 TL\'ye kadar'],
    logo: '/images/banks/akbank.svg'
  },

  // QNB Finansbank
  {
    id: 'qnb-hesap-isletim',
    bank: 'QNB Finansbank',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 26,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['5.500 TL altı ortalama bakiye için'],
    logo: '/images/banks/qnb-finansbank.svg'
  },
  {
    id: 'qnb-sms-bildirim',
    bank: 'QNB Finansbank',
    category: 'other',
    name: 'SMS Bildirim Ücreti',
    amount: 8,
    description: 'Her hesap hareketi için SMS bildirimi',
    frequency: 'per-transaction',
    conditions: ['Aylık maksimum 50 TL'],
    logo: '/images/banks/qnb-finansbank.svg'
  },

  // Halkbank
  {
    id: 'halkbank-hesap-isletim',
    bank: 'Halkbank',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 18,
    description: 'Vadesiz hesap aylık işletim ücreti',
    frequency: 'monthly',
    conditions: ['2.500 TL altı ortalama bakiye için'],
    logo: '/images/banks/halkbank.svg'
  },
  {
    id: 'halkbank-kredi-dosya',
    bank: 'Halkbank',
    category: 'loan',
    name: 'Kredi Dosya İnceleme',
    amount: 350,
    description: 'Kredi başvuru dosya inceleme ücreti',
    frequency: 'one-time',
    conditions: ['Red durumunda iade edilmez'],
    logo: '/images/banks/halkbank.svg'
  },

  // Enpara.com
  {
    id: 'enpara-hesap-isletim',
    bank: 'Enpara.com',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 0,
    description: 'Dijital banka avantajı - tamamen ücretsiz',
    frequency: 'monthly',
    conditions: ['Şartsız ücretsiz'],
    logo: '/images/banks/enpara.svg'
  },
  {
    id: 'enpara-transfer',
    bank: 'Enpara.com',
    category: 'transfer',
    name: 'EFT/Havale Ücreti',
    amount: 0,
    description: 'Tüm transfer işlemleri ücretsiz',
    frequency: 'per-transaction',
    conditions: ['Dijital banka avantajı'],
    logo: '/images/banks/enpara.svg'
  },

  // ING
  {
    id: 'ing-hesap-isletim',
    bank: 'ING',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 0,
    description: 'Turuncu Hesap tamamen ücretsiz',
    frequency: 'monthly',
    conditions: ['Şartsız ücretsiz'],
    logo: '/images/banks/ing.svg'
  },
  {
    id: 'ing-kart-yillik',
    bank: 'ING',
    category: 'card',
    name: 'Kredi Kartı Yıllık Ücreti',
    amount: 0,
    description: 'Turuncu Kart yaşam boyu ücretsiz',
    frequency: 'yearly',
    conditions: ['Yaşam boyu ücretsiz'],
    logo: '/images/banks/ing.svg'
  },

  // CEPTE TEB
  {
    id: 'cepte-teb-hesap-isletim',
    bank: 'CEPTE TEB',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 15,
    description: 'Mobil odaklı hesap işletim ücreti',
    frequency: 'monthly',
    conditions: ['2.000 TL altı ortalama bakiye için'],
    logo: '/images/banks/cepte-teb.svg'
  },
  {
    id: 'cepte-teb-mobil-islem',
    bank: 'CEPTE TEB',
    category: 'other',
    name: 'Mobil İşlem Ücreti',
    amount: 0,
    description: 'Mobil app üzerinden tüm işlemler ücretsiz',
    frequency: 'per-transaction',
    conditions: ['Mobil uygulama avantajı'],
    logo: '/images/banks/cepte-teb.svg'
  },

  // Fibabanka
  {
    id: 'fibabanka-hesap-isletim',
    bank: 'Fibabanka',
    category: 'account',
    name: 'Hesap İşletim Ücreti',
    amount: 35,
    description: 'Premium hesap işletim ücreti',
    frequency: 'monthly',
    conditions: ['Kişisel bankacı hizmeti dahil'],
    logo: '/images/banks/fibabanka.svg'
  },
  {
    id: 'fibabanka-premium-hizmet',
    bank: 'Fibabanka',
    category: 'other',
    name: 'Premium Hizmet Paketi',
    amount: 75,
    description: 'VIP müşteriler için özel hizmet paketi',
    frequency: 'monthly',
    conditions: ['Kişisel bankacı ve özel avantajlar'],
    logo: '/images/banks/fibabanka.svg'
  }
]

export const getFeesByCategory = (category: Fee['category']): Fee[] => {
  return fees.filter(fee => fee.category === category)
}

export const getFeesByBank = (bankSlug: string): Fee[] => {
  return fees.filter(fee => 
    fee.bank.toLowerCase().replace(/[^a-z0-9]/g, '-') === bankSlug
  )
}

export const getFeeById = (id: string): Fee | undefined => {
  return fees.find(fee => fee.id === id)
}

export const getCategoryDisplayName = (category: Fee['category']): string => {
  const names = {
    account: 'Hesap İşletim',
    card: 'Kart Ücretleri',
    transfer: 'Para Transfer',
    loan: 'Kredi Masrafları',
    other: 'Diğer Ücretler'
  }
  return names[category]
}