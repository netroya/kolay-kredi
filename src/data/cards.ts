export interface CreditCard {
  id: string
  name: string
  bank: string
  logo: string
  type: 'standard' | 'gold' | 'platinum' | 'world' | 'infinite'
  annualFee: number
  welcomeBonus?: string
  rewardRate: number
  features: string[]
  benefits: string[]
  requirements: string[]
  applicationUrl?: string
}

export const cards: CreditCard[] = [
  // Ziraat Bankası
  {
    id: 'ziraat-world',
    name: 'Ziraat World Kart',
    bank: 'Ziraat Bankası',
    logo: '/images/banks/ziraat.svg',
    type: 'world',
    annualFee: 150,
    welcomeBonus: '50.000 Bonus Puan',
    rewardRate: 2.5,
    features: ['World Card avantajları', 'Havaalanı lounge', 'Seyahat sigortası'],
    benefits: ['Miles&Smiles puan', 'Ücretsiz valet', 'Concierge hizmet'],
    requirements: ['Min. 15.000 TL aylık gelir', 'Kredi notu AA+']
  },
  {
    id: 'ziraat-platinum',
    name: 'Ziraat Platinum',
    bank: 'Ziraat Bankası',
    logo: '/images/banks/ziraat.svg',
    type: 'platinum',
    annualFee: 75,
    welcomeBonus: '25.000 Bonus Puan',
    rewardRate: 2.0,
    features: ['Platinum avantajları', 'Online alışveriş bonusu', 'Taksit seçenekleri'],
    benefits: ['Bonus puan', 'İndirim kampanyaları', 'Özel fırsatlar'],
    requirements: ['Min. 8.000 TL aylık gelir', 'İyi kredi notu']
  },

  // VakıfBank
  {
    id: 'vakifbank-world',
    name: 'VakıfBank World Kart',
    bank: 'VakıfBank',
    logo: '/images/banks/vakifbank.svg',
    type: 'world',
    annualFee: 160,
    welcomeBonus: '60.000 Bonus Puan',
    rewardRate: 3.0,
    features: ['World Card privileges', 'Priority Pass', 'Seyahat sigortası'],
    benefits: ['WorldPuan', 'Havaalanı transfer', 'Golf avantajları'],
    requirements: ['Min. 18.000 TL aylık gelir', 'Kredi notu AAA']
  },
  {
    id: 'vakifbank-gold',
    name: 'VakıfBank Gold',
    bank: 'VakıfBank',
    logo: '/images/banks/vakifbank.svg',
    type: 'gold',
    annualFee: 50,
    rewardRate: 1.5,
    features: ['Gold avantajları', 'Taksit kampanyaları', 'Online bonus'],
    benefits: ['Bonus puan', 'İndirimli alışveriş', 'Özel kampanyalar'],
    requirements: ['Min. 6.000 TL aylık gelir', 'İyi kredi geçmişi']
  },

  // İş Bankası
  {
    id: 'isbank-maximum',
    name: 'Maximum Kart',
    bank: 'İş Bankası',
    logo: '/images/banks/isbank.svg',
    type: 'world',
    annualFee: 200,
    welcomeBonus: '100.000 Maximum Puan',
    rewardRate: 4.0,
    features: ['Maximum avantajları', 'Premium hizmetler', 'Sınırsız lounge'],
    benefits: ['Maximum puan', 'Concierge', 'Seyahat avantajları'],
    requirements: ['Min. 25.000 TL aylık gelir', 'Premium müşteri']
  },
  {
    id: 'isbank-platinum',
    name: 'İşbank Platinum',
    bank: 'İş Bankası',
    logo: '/images/banks/isbank.svg',
    type: 'platinum',
    annualFee: 120,
    rewardRate: 2.5,
    features: ['Platinum privileges', 'Bonus program', 'Özel kampanyalar'],
    benefits: ['Axess puan', 'Taksit avantajları', 'İndirimler'],
    requirements: ['Min. 12.000 TL aylık gelir', 'AA kredi notu']
  },

  // Yapı Kredi
  {
    id: 'yapi-kredi-world',
    name: 'World Kart',
    bank: 'Yapı Kredi',
    logo: '/images/banks/yapi-kredi.svg',
    type: 'world',
    annualFee: 180,
    welcomeBonus: '75.000 World Puan',
    rewardRate: 3.5,
    features: ['World Card benefits', 'Lounge erişimi', 'Travel insurance'],
    benefits: ['World puan', 'Premium hizmet', 'Seyahat avantajları'],
    requirements: ['Min. 20.000 TL aylık gelir', 'Yüksek kredi skoru']
  },
  {
    id: 'yapi-kredi-bonus',
    name: 'Bonus Kart',
    bank: 'Yapı Kredi',
    logo: '/images/banks/yapi-kredi.svg',
    type: 'standard',
    annualFee: 0,
    rewardRate: 1.0,
    features: ['Bonus program', 'Kampanya fırsatları', 'Ücretsiz kart'],
    benefits: ['Bonus puan', 'Market indirimleri', 'Akaryakıt avantajı'],
    requirements: ['Min. 4.000 TL aylık gelir', 'Temel kredi notu']
  },

  // Garanti BBVA
  {
    id: 'garanti-bbva-platinum',
    name: 'Garanti BBVA Platinum',
    bank: 'Garanti BBVA',
    logo: '/images/banks/garanti-bbva.svg',
    type: 'platinum',
    annualFee: 140,
    welcomeBonus: '80.000 Bonus Puan',
    rewardRate: 3.0,
    features: ['Platinum avantajları', 'Bonus program', 'Premium hizmet'],
    benefits: ['Bonus puan', 'Seyahat sigortası', 'Concierge'],
    requirements: ['Min. 15.000 TL aylık gelir', 'AA+ kredi notu']
  },
  {
    id: 'garanti-bbva-world',
    name: 'Garanti BBVA World',
    bank: 'Garanti BBVA',
    logo: '/images/banks/garanti-bbva.svg',
    type: 'world',
    annualFee: 220,
    rewardRate: 4.5,
    features: ['World Card privileges', 'Unlimited lounge', 'Premium service'],
    benefits: ['Miles&Smiles', 'Golf privileges', 'Travel benefits'],
    requirements: ['Min. 30.000 TL aylık gelir', 'VIP müşteri']
  },

  // Akbank
  {
    id: 'akbank-axess',
    name: 'Akbank Axess',
    bank: 'Akbank',
    logo: '/images/banks/akbank.svg',
    type: 'standard',
    annualFee: 0,
    rewardRate: 1.2,
    features: ['Axess program', 'Ücretsiz kart', 'Kampanya fırsatları'],
    benefits: ['Axess puan', 'Market bonusu', 'Online avantajları'],
    requirements: ['Min. 4.500 TL aylık gelir', 'Temel şartlar']
  },
  {
    id: 'akbank-platinum',
    name: 'Akbank Platinum',
    bank: 'Akbank',
    logo: '/images/banks/akbank.svg',
    type: 'platinum',
    annualFee: 130,
    rewardRate: 2.8,
    features: ['Platinum benefits', 'Lounge access', 'Travel insurance'],
    benefits: ['Chip-para', 'Premium service', 'Seyahat avantajları'],
    requirements: ['Min. 14.000 TL aylık gelir', 'AA kredi notu']
  },

  // QNB Finansbank
  {
    id: 'qnb-platinum',
    name: 'QNB Finansbank Platinum',
    bank: 'QNB Finansbank',
    logo: '/images/banks/qnb-finansbank.svg',
    type: 'platinum',
    annualFee: 125,
    rewardRate: 2.3,
    features: ['Platinum avantajları', 'Bonus program', 'Özel hizmetler'],
    benefits: ['Enpara puan', 'Seyahat bonusu', 'İndirimler'],
    requirements: ['Min. 12.000 TL aylık gelir', 'İyi kredi skoru']
  },
  {
    id: 'qnb-gold',
    name: 'QNB Gold Kart',
    bank: 'QNB Finansbank',
    logo: '/images/banks/qnb-finansbank.svg',
    type: 'gold',
    annualFee: 60,
    rewardRate: 1.8,
    features: ['Gold benefits', 'Reward program', 'Kampanya avantajları'],
    benefits: ['Bonus puan', 'Alışveriş indirimleri', 'Taksit seçenekleri'],
    requirements: ['Min. 7.000 TL aylık gelir', 'Standart şartlar']
  },

  // Halkbank
  {
    id: 'halkbank-platinum',
    name: 'Halk Kart Platinum',
    bank: 'Halkbank',
    logo: '/images/banks/halkbank.svg',
    type: 'platinum',
    annualFee: 90,
    rewardRate: 2.0,
    features: ['Platinum avantajları', 'Halk puan', 'Kampanyalar'],
    benefits: ['Halk puan', 'Market avantajları', 'Yakıt indirimi'],
    requirements: ['Min. 10.000 TL aylık gelir', 'İyi kredi geçmişi']
  },
  {
    id: 'halkbank-standard',
    name: 'Halk Kart Klasik',
    bank: 'Halkbank',
    logo: '/images/banks/halkbank.svg',
    type: 'standard',
    annualFee: 0,
    rewardRate: 1.0,
    features: ['Ücretsiz kart', 'Temel avantajlar', 'Kampanya fırsatları'],
    benefits: ['Bonus puan', 'Alışveriş avantajları', 'Taksit seçenekleri'],
    requirements: ['Min. 4.000 TL aylık gelir', 'Temel şartlar']
  },

  // Enpara.com
  {
    id: 'enpara-kart',
    name: 'Enpara Kart',
    bank: 'Enpara.com',
    logo: '/images/banks/enpara.svg',
    type: 'gold',
    annualFee: 0,
    rewardRate: 2.5,
    features: ['Dijital banka avantajı', 'Ücretsiz', 'Online bonus'],
    benefits: ['Enpara puan', 'Cashback', 'Dijital kampanyalar'],
    requirements: ['Min. 5.000 TL aylık gelir', 'Online başvuru']
  },

  // ING
  {
    id: 'ing-turuncu',
    name: 'ING Turuncu Kart',
    bank: 'ING',
    logo: '/images/banks/ing.svg',
    type: 'gold',
    annualFee: 0,
    rewardRate: 2.2,
    features: ['Ücretsiz kart', 'Basit şartlar', 'Hızlı onay'],
    benefits: ['Parapuan', 'Cashback', 'Online avantajlar'],
    requirements: ['Min. 5.500 TL aylık gelir', 'Basit başvuru']
  },

  // CEPTE TEB
  {
    id: 'cepte-teb-platinum',
    name: 'CEPTE TEB Platinum',
    bank: 'CEPTE TEB',
    logo: '/images/banks/cepte-teb.svg',
    type: 'platinum',
    annualFee: 110,
    rewardRate: 2.4,
    features: ['Mobil odaklı', 'Platinum avantajları', 'Hızlı işlem'],
    benefits: ['BonusFlaş puan', 'Mobil kampanyalar', 'Dijital avantajlar'],
    requirements: ['Min. 11.000 TL aylık gelir', 'Mobil başvuru']
  },

  // Fibabanka
  {
    id: 'fibabanka-platinum',
    name: 'Fibabanka Platinum Plus',
    bank: 'Fibabanka',
    logo: '/images/banks/fibabanka.svg',
    type: 'platinum',
    annualFee: 135,
    rewardRate: 3.2,
    features: ['Premium hizmet', 'Kişisel bankacı', 'Özel avantajlar'],
    benefits: ['Bonus puan', 'VIP hizmetler', 'Kişiselleştirilmiş kampanyalar'],
    requirements: ['Min. 16.000 TL aylık gelir', 'Premium müşteri']
  }
]