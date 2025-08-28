import React from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import { Users, Award, Shield, TrendingUp } from 'lucide-react'

const About: React.FC = () => {
  const features = [
    {
      icon: <Users className="w-8 h-8 text-blue-600" />,
      title: 'Kapsamlı Karşılaştırma',
      description: 'Türkiye\'nin en büyük bankalarının tüm kredi ve kart ürünlerini tek platformda karşılaştırın.'
    },
    {
      icon: <Award className="w-8 h-8 text-green-600" />,
      title: 'En Uygun Fırsatlar',
      description: 'Güncel faiz oranları ve kampanyalarla size en uygun finansal ürünü bulun.'
    },
    {
      icon: <Shield className="w-8 h-8 text-purple-600" />,
      title: 'Güvenli Platform',
      description: 'Kişisel bilgileriniz güvende. Sadece karşılaştırma yapıyoruz, veri saklamıyoruz.'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-orange-600" />,
      title: 'Güncel Veriler',
      description: 'Faiz oranları ve kampanya bilgileri sürekli güncellenir, her zaman doğru karar verin.'
    }
  ]

  return (
    <>
      <Helmet>
        <title>Hakkımızda - Kolay Kredi</title>
        <meta name="description" content="Kolay Kredi, Türkiye'nin en kapsamlı kredi ve kredi kartı karşılaştırma platformudur. En uygun faiz oranlarını bulun." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/hakkimizda" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kolay Kredi, finansal kararlarınızı kolaylaştıran Türkiye'nin en kapsamlı 
              kredi ve kredi kartı karşılaştırma platformudur.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-4xl mx-auto">
          {/* Misyonumuz */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Misyonumuz
            </h2>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Finansal ürünler arasından seçim yapmak karmaşık ve zaman alıcı olabilir. 
                Kolay Kredi olarak, bu süreci sizin için basitleştiriyoruz.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Amacımız, Türkiye'deki tüm bankaların kredi ve kredi kartı ürünlerini 
                şeffaf bir şekilde karşılaştırmanıza imkan sağlayarak, size en uygun 
                finansal ürünü bulmanızda yardımcı olmaktır.
              </p>
            </div>
          </section>

          {/* Özellikler */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Neden Kolay Kredi?
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                  <div className="flex items-center mb-4">
                    {feature.icon}
                    <h3 className="text-xl font-semibold text-gray-900 ml-3">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* İstatistikler */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl text-white p-8">
              <h2 className="text-3xl font-bold mb-8 text-center">
                Rakamlarla Kolay Kredi
              </h2>
              <div className="grid md:grid-cols-3 gap-8 text-center">
                <div>
                  <div className="text-4xl font-bold mb-2">15+</div>
                  <p className="text-blue-100">Banka Ortağı</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">100+</div>
                  <p className="text-blue-100">Kredi Ürünü</p>
                </div>
                <div>
                  <div className="text-4xl font-bold mb-2">50+</div>
                  <p className="text-blue-100">Kredi Kartı</p>
                </div>
              </div>
            </div>
          </section>

          {/* Güvenlik */}
          <section>
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Güvenlik & Gizlilik
            </h2>
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
              <div className="flex items-start">
                <Shield className="w-8 h-8 text-green-600 mt-1 mr-4 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-green-900 mb-4">
                    Verileriniz Güvende
                  </h3>
                  <ul className="space-y-2 text-green-800">
                    <li>• Kişisel bilgilerinizi saklamıyoruz</li>
                    <li>• Sadece karşılaştırma için gerekli bilgileri kullanıyoruz</li>
                    <li>• SSL sertifikası ile güvenli bağlantı</li>
                    <li>• KVKK uyumlu veri işleme politikası</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}

export default About