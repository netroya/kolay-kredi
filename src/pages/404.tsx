import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import { Home, Search, AlertTriangle } from 'lucide-react'

const NotFound: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Sayfa Bulunamadı (404) | Kolay Kredi</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. Ana sayfaya dönebilir veya kredi karşılaştırma sayfalarımızı ziyaret edebilirsiniz." />
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center py-12">
        <Container>
          <div className="text-center max-w-2xl mx-auto">
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-12 h-12 text-red-600" />
              </div>
            </div>
            
            <h1 className="text-6xl font-bold text-gray-900 mb-4">
              404
            </h1>
            
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Sayfa Bulunamadı
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Aradığınız sayfa mevcut değil veya taşınmış olabilir. 
              Lütfen URL'yi kontrol edin veya aşağıdaki bağlantıları kullanın.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Home className="w-5 h-5 mr-2" />
                Ana Sayfa
              </Link>
              
              <Link
                to="/kredi"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                <Search className="w-5 h-5 mr-2" />
                Kredi Ara
              </Link>
            </div>

            <div className="mt-12 p-6 bg-white rounded-xl shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Popüler Sayfalar
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-sm">
                <Link to="/" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Ana Sayfa
                </Link>
                <Link to="/kredi" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Kredi Karşılaştırma
                </Link>
                <Link to="/kredi-karti" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Kredi Kartları
                </Link>
                <Link to="/kampanyalar" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Kampanyalar
                </Link>
                <Link to="/hesaplama" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Kredi Hesaplama
                </Link>
                <Link to="/bankalar" className="text-blue-600 hover:text-blue-800 transition-colors">
                  Bankalar
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </>
  )
}

export default NotFound