import React from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import { FileText, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

const Terms: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Kullanım Şartları - Kolay Kredi</title>
        <meta name="description" content="Kolay Kredi kullanım şartları ve koşulları. Platform kullanımı ile ilgili kurallar ve sorumluluklar." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/kullanim-sartlari" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <FileText className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Kullanım Şartları
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kolay Kredi platformunu kullanarak aşağıdaki şartları kabul etmiş sayılırsınız.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-3">
              <FileText className="w-6 h-6 text-blue-600 mr-3" />
              <h3 className="text-lg font-semibold text-blue-900 m-0">
                Son Güncelleme
              </h3>
            </div>
            <p className="text-blue-800 m-0">
              Bu kullanım şartları en son 28 Ağustos 2024 tarihinde güncellenmiştir.
            </p>
          </div>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <p className="text-orange-800 m-0 font-medium">
              ⚠️ <strong>Uyarı:</strong> Bu sayfa örnek/placeholder içerik içermektedir. 
              Gerçek kullanım için hukuk müşavirliği ile gözden geçirilmeli ve güncellenmeli.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              1. Genel Bilgiler
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">
                Kolay Kredi, kredi ve kredi kartı karşılaştırma hizmeti sunan bir platformdur. 
                Bu şartlar, platformun kullanımını düzenler ve tüm kullanıcılar için bağlayıcıdır.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Platform, bilgilendirme amaçlı hizmet sunar</li>
                <li>Kredi başvurusu yapmak için bankaların kendi kanallarını kullanmalısınız</li>
                <li>Gösterilen bilgiler güncel olmayabilir</li>
                <li>Nihai karar bankalara aittir</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <CheckCircle className="w-6 h-6 mr-3 text-green-600" />
              2. Kullanıcı Hakları
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">Platform kullanıcıları olarak aşağıdaki haklara sahipsiniz:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Ücretsiz karşılaştırma hizmeti alma</li>
                <li>Güncel kredi bilgilerine erişim</li>
                <li>Hesaplama araçlarını kullanma</li>
                <li>İletişim kanalları üzerinden destek alma</li>
                <li>Kişisel verilerin korunmasını talep etme</li>
                <li>Platform önerilerinden yararlanma</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <XCircle className="w-6 h-6 mr-3 text-red-600" />
              3. Kullanıcı Sorumlulukları
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">Platform kullanıcıları olarak aşağıdaki konularda sorumlusunuz:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Doğru Bilgi Sağlama:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Hesaplama araçlarında doğru bilgi girme</li>
                    <li>İletişim formlarında gerçek bilgiler paylaşma</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Yasalara Uygun Kullanım:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Platform üzerinde zararlı içerik paylaşmama</li>
                    <li>Diğer kullanıcıların haklarına saygı gösterme</li>
                    <li>Sistemi kötüye kullanmama</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Güvenlik:</h4>
                  <ul className="list-disc list-inside space-y-1 text-gray-700">
                    <li>Kişisel bilgilerinizi güvende tutma</li>
                    <li>Şüpheli aktiviteleri bildirme</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              4. Hizmet Kapsamı ve Sınırları
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 mr-2 text-green-600" />
                    Sağladığımız Hizmetler
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Kredi karşılaştırma</li>
                    <li>Kredi kartı karşılaştırma</li>
                    <li>Faiz hesaplama araçları</li>
                    <li>Banka promosyon bilgileri</li>
                    <li>Ücret karşılaştırmaları</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-red-900 mb-3 flex items-center">
                    <XCircle className="w-5 h-5 mr-2 text-red-600" />
                    Sağlamadığımız Hizmetler
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm">
                    <li>Kredi başvuru işlemleri</li>
                    <li>Finansal danışmanlık</li>
                    <li>Kredi onay garantisi</li>
                    <li>Yasal tavsiye</li>
                    <li>Kişisel mali planlama</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <AlertCircle className="w-6 h-6 mr-3 text-orange-600" />
              5. Sorumluluk Reddi
            </h2>
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">Bilgi Doğruluğu:</h4>
                  <p className="text-orange-800 text-sm">
                    Platform üzerinde gösterilen faiz oranları, ücretler ve kampanya bilgileri 
                    bilgilendirme amaçlıdır. Güncel olmayabilir ve değişiklik gösterebilir.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">Karar Sorumluluğu:</h4>
                  <p className="text-orange-800 text-sm">
                    Finansal kararlarınız tamamen size aittir. Platform önerileri tavsiye 
                    niteliğinde olup, karar verme sorumluluğu kullanıcıya aittir.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-orange-900 mb-2">Üçüncü Taraf Bağlantıları:</h4>
                  <p className="text-orange-800 text-sm">
                    Banka sitelerine yönlendiren bağlantılar için sorumluluk kabul etmiyoruz. 
                    Bu sitelerin kendi şartları geçerlidir.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              6. Fikri Mülkiyet
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">
                Kolay Kredi platformundaki tüm içerik, tasarım, logo ve yazılımlar 
                telif hakkı ile korunmaktadır.
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>İçeriği izinsiz kopyalamak yasaktır</li>
                <li>Platform tasarımını taklit etmek yasaktır</li>
                <li>Verilerimizi kazımak (scraping) yasaktır</li>
                <li>Ticari amaçla kullanım izin gerektirir</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              7. Hizmet Değişiklikleri
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">
                Platform hizmetlerinde değişiklik yapma hakkını saklı tutarız:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Yeni özellikler ekleyebiliriz</li>
                <li>Mevcut özellikleri kaldırabilir veya değiştirebiliriz</li>
                <li>Hizmeti geçici olarak durdurabilir veya sınırlandırabiliriz</li>
                <li>Teknik bakım için platform erişimini kesebiliriz</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              8. Hesap Askıya Alma ve Sonlandırma
            </h2>
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <p className="mb-4 text-red-800">
                Aşağıdaki durumlarda hesabınızı askıya alabilir veya platformdan engelleyebiliriz:
              </p>
              <ul className="list-disc list-inside space-y-2 text-red-800">
                <li>Kullanım şartlarını ihlal etme</li>
                <li>Yanlış veya yanıltıcı bilgi paylaşma</li>
                <li>Sistemi kötüye kullanma</li>
                <li>Zararlı aktivitelerde bulunma</li>
                <li>Diğer kullanıcıları rahatsız etme</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              9. Uygulanacak Hukuk
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="list-disc list-inside space-y-2">
                <li>Bu şartlar Türkiye Cumhuriyeti yasalarına tabidir</li>
                <li>Uyuşmazlıklar İstanbul mahkemelerinde çözülür</li>
                <li>KVKK ve ilgili mevzuat hükümleri geçerlidir</li>
                <li>Tüketici hakları saklıdır</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              10. İletişim ve Şikayetler
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="mb-4 text-blue-800">
                Kullanım şartları ile ilgili sorularınız için:
              </p>
              <ul className="list-none space-y-2 text-blue-800">
                <li><strong>E-posta:</strong> destek@kolaykredi.com</li>
                <li><strong>İletişim Formu:</strong> /iletisim sayfası</li>
                <li><strong>Yasal İşler:</strong> yasal@kolaykredi.com</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              11. Değişiklikler
            </h2>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <p>
                Bu kullanım şartlarında değişiklik yapma hakkımızı saklı tutarız. 
                Önemli değişiklikler durumunda kullanıcıları bilgilendireceğiz. 
                Platformu kullanmaya devam ederek yeni şartları kabul etmiş sayılırsınız.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}

export default Terms