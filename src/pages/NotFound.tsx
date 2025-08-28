import React from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import Container from '../components/Container'
import Button from '../components/Button'
import { Home, Search, ArrowLeft, HelpCircle } from 'lucide-react'

const NotFound: React.FC = () => {
  const popularPages = [
    {
      title: 'Kredi Karşılaştırma',
      description: 'En uygun kredi faiz oranlarını karşılaştırın',
      href: '/kredi',
      icon: <Search className="w-5 h-5" />
    },
    {
      title: 'Kredi Kartları',
      description: 'Kredi kartı özelliklerini inceleyin',
      href: '/kredi-karti',
      icon: <Search className="w-5 h-5" />
    },
    {
      title: 'Emekli Promosyonları',
      description: 'Emekliler için özel fırsatları keşfedin',
      href: '/emekli-promosyonu',
      icon: <Search className="w-5 h-5" />
    }
  ]

  return (
    <>
      <Helmet>
        <title>Sayfa Bulunamadı - Kolay Kredi</title>
        <meta name="description" content="Aradığınız sayfa bulunamadı. Ana sayfaya dönün veya diğer sayfalara göz atın." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <Container className="py-16">
        <div className="text-center max-w-2xl mx-auto">
          {/* 404 Illustration */}
          <div className="mb-8">
            <div className="text-8xl font-bold text-blue-600 mb-4">404</div>
            <div className="w-32 h-32 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
              <HelpCircle className="w-16 h-16 text-blue-600" />
            </div>
          </div>

          {/* Error Message */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Sayfa Bulunamadı
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Aradığınız sayfa kaldırılmış, adı değişmiş veya geçici olarak kullanılamıyor olabilir.
            </p>
            <p className="text-gray-500">
              URL'yi kontrol edin veya aşağıdaki seçeneklerden birini kullanın.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              as={Link} 
              to="/" 
              size="lg"
              className="flex items-center justify-center"
            >
              <Home className="w-5 h-5 mr-2" />
              Ana Sayfa
            </Button>
            
            <Button 
              variant="outline" 
              onClick={() => window.history.back()}
              size="lg"
              className="flex items-center justify-center"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Geri Dön
            </Button>
          </div>

          {/* Popular Pages */}
          <div className="text-left max-w-md mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 text-center">
              Popüler Sayfalar
            </h2>
            <div className="space-y-4">
              {popularPages.map((page, index) => (
                <Link
                  key={index}
                  to={page.href}
                  className="block p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start">
                    <div className="flex-shrink-0 w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mr-3">
                      {page.icon}
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 mb-1">
                        {page.title}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {page.description}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="font-semibold text-blue-900 mb-2">
              Hala yardıma mı ihtiyacınız var?
            </h3>
            <p className="text-blue-800 mb-4">
              Aradığınızı bulamadıysanız bizimle iletişime geçin.
            </p>
            <Button 
              as={Link} 
              to="/iletisim" 
              variant="outline" 
              size="sm"
            >
              İletişime Geç
            </Button>
          </div>
        </div>
      </Container>
    </>
  )
}

export default NotFound