import React from 'react'
import { Link } from 'react-router-dom'

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg mr-3">
                  ₺
                </div>
                <h3 className="text-xl font-bold">Kolay Kredi</h3>
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Türkiye'nin en kapsamlı kredi ve finansal ürün karşılaştırma platformu. 
                En uygun seçenekleri bulmanıza yardımcı oluyoruz.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M20 10C20 4.477 15.523 0 10 0S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Hizmetler</h4>
              <ul className="space-y-3">
                <li><Link to="/kredi" className="text-gray-300 hover:text-white transition-colors text-sm">Kredi Karşılaştırma</Link></li>
                <li><Link to="/kredi-karti" className="text-gray-300 hover:text-white transition-colors text-sm">Kredi Kartları</Link></li>
                <li><Link to="/emekli-promosyonu" className="text-gray-300 hover:text-white transition-colors text-sm">Emekli Promosyonları</Link></li>
                <li><Link to="/ucretler" className="text-gray-300 hover:text-white transition-colors text-sm">Banka Ücretleri</Link></li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Destek</h4>
              <ul className="space-y-3">
                <li><Link to="/hakkimizda" className="text-gray-300 hover:text-white transition-colors text-sm">Hakkımızda</Link></li>
                <li><Link to="/iletisim" className="text-gray-300 hover:text-white transition-colors text-sm">İletişim</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Yardım Merkezi</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">SSS</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Yasal</h4>
              <ul className="space-y-3">
                <li><Link to="/gizlilik-politikasi" className="text-gray-300 hover:text-white transition-colors text-sm">Gizlilik Politikası</Link></li>
                <li><Link to="/kullanim-sartlari" className="text-gray-300 hover:text-white transition-colors text-sm">Kullanım Şartları</Link></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">Çerez Politikası</a></li>
                <li><a href="#" className="text-gray-300 hover:text-white transition-colors text-sm">KVKK</a></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Trademark Notice */}
        <div className="border-t border-gray-800 py-6">
          <div className="bg-gray-800 rounded-lg p-4 mb-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="text-sm text-gray-300 leading-relaxed">
                <p className="font-medium text-white mb-2">Marka Sahipliği ve Kullanım Bildirimi</p>
                <p>
                  Bu platformda yer alan banka logoları, isimleri ve markaları ilgili bankaların tescilli markalarıdır. 
                  Bu markalar yalnızca <strong>nominatif kullanım</strong> (tanımlama amaçlı) çerçevesinde, 
                  bankaların ürün ve hizmetlerini tanıtmak için kullanılmaktadır.
                </p>
                <p className="mt-2">
                  Marka sahipleri: Garanti BBVA®, Ziraat Bankası®, Akbank®, Yapı Kredi®, İş Bankası®, 
                  Halkbank®, VakıfBank®, Denizbank®, QNB Finansbank®, TEB®, ING® ve diğerleri 
                  ilgili kurumların tescilli markalarıdır.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 py-6">
          <div className="md:flex md:items-center md:justify-between">
            <div className="text-sm text-gray-400">
              <p>&copy; 2024 Kolay Kredi. Tüm hakları saklıdır.</p>
              <p className="mt-1">
                Bu site bilgilendirme amaçlıdır. Finansal kararlar için bankanıza başvurun.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex space-x-4 text-xs text-gray-500">
                <span>Made with ❤️ in Turkey</span>
                <span>•</span>
                <span>v2.1.0</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer