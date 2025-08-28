import React from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import { Shield, Eye, Lock, FileText } from 'lucide-react'

const Privacy: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>Gizlilik Politikası - Kolay Kredi</title>
        <meta name="description" content="Kolay Kredi gizlilik politikası. Kişisel verilerinizin nasıl korunduğu ve işlendiği hakkında bilgi edinin." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/gizlilik-politikasi" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              Gizlilik Politikası
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kişisel verilerinizin korunması bizim için önemlidir. Bu politika, 
              verilerinizi nasıl topladığımızı ve koruduğumuzu açıklar.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-4xl mx-auto prose prose-lg">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
            <div className="flex items-center mb-3">
              <FileText className="w-6 h-6 text-yellow-600 mr-3" />
              <h3 className="text-lg font-semibold text-yellow-900 m-0">
                Son Güncelleme
              </h3>
            </div>
            <p className="text-yellow-800 m-0">
              Bu gizlilik politikası en son 28 Ağustos 2024 tarihinde güncellenmiştir.
            </p>
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <p className="text-blue-800 m-0 font-medium">
              📋 <strong>Not:</strong> Bu sayfa örnek/placeholder içerik barındırmaktadır. 
              Gerçek bir web sitesi için yasal danışmanlık alınarak güncellenmelidir.
            </p>
          </div>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Eye className="w-6 h-6 mr-3 text-blue-600" />
              Topladığımız Bilgiler
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold mb-4">Otomatik Toplanan Bilgiler:</h3>
              <ul className="list-disc list-inside space-y-2 mb-6">
                <li>IP adresi ve genel konum bilgisi</li>
                <li>Tarayıcı türü ve sürümü</li>
                <li>Ziyaret edilen sayfalar ve süre</li>
                <li>Referans kaynak (hangi siteden geldiğiniz)</li>
                <li>Cihaz bilgileri (mobil/masaüstü)</li>
              </ul>

              <h3 className="text-lg font-semibold mb-4">Kullanıcı Tarafından Sağlanan Bilgiler:</h3>
              <ul className="list-disc list-inside space-y-2">
                <li>İletişim formunda paylaşılan bilgiler (ad, e-posta, mesaj)</li>
                <li>Kredi hesaplama araçlarında girilen finansal bilgiler</li>
                <li>Arama sorguları ve filtre tercihleri</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Lock className="w-6 h-6 mr-3 text-green-600" />
              Bilgilerin Kullanımı
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">Topladığımız bilgileri aşağıdaki amaçlarla kullanırız:</p>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Hizmet Sağlama:</strong> Platform özelliklerini ve karşılaştırma araçlarını sağlamak</li>
                <li><strong>Kişiselleştirme:</strong> Size daha uygun öneriler sunmak</li>
                <li><strong>İletişim:</strong> Sorularınızı yanıtlamak ve destek sağlamak</li>
                <li><strong>Analiz:</strong> Platform performansını analiz etmek ve geliştirmek</li>
                <li><strong>Güvenlik:</strong> Dolandırıcılık ve kötüye kullanımları önlemek</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Çerezler (Cookies)
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">Sitemizde aşağıdaki çerez türlerini kullanıyoruz:</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900">Zorunlu Çerezler:</h4>
                  <p className="text-gray-600">Sitenin temel fonksiyonları için gerekli çerezler</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Analitik Çerezler:</h4>
                  <p className="text-gray-600">Site kullanımını analiz etmek için kullanılan çerezler</p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900">Tercih Çerezleri:</h4>
                  <p className="text-gray-600">Kullanıcı tercihlerini hatırlamak için kullanılan çerezler</p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Veri Paylaşımı
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
                <p className="text-red-800 font-medium m-0">
                  🚫 Kişisel verilerinizi üçüncü taraflarla satmıyoruz veya kiralık vermiyoruz.
                </p>
              </div>
              
              <p className="mb-4">Verilerinizi sadece aşağıdaki durumlarda paylaşabiliriz:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Yasal yükümlülükler gereği</li>
                <li>Güvenlik tehditlerine karşı koruma amacıyla</li>
                <li>Hizmet sağlayıcılarımızla (sunucu, analitik araçları)</li>
                <li>Açık rızanız dahilinde</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Haklarınız
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">KVKK kapsamında aşağıdaki haklara sahipsiniz:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="list-disc list-inside space-y-2">
                  <li>Verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenen veriler hakkında bilgi talep etme</li>
                  <li>Verilerin düzeltilmesini isteme</li>
                  <li>Verilerin silinmesini talep etme</li>
                </ul>
                <ul className="list-disc list-inside space-y-2">
                  <li>Veri işlemeye itiraz etme</li>
                  <li>Verilerin üçüncü taraflarla paylaşımına itiraz</li>
                  <li>Otomatik karar verme süreçlerine itiraz</li>
                  <li>Zararınızın tazmini talep etme</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Veri Güvenliği
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p className="mb-4">Verilerinizin güvenliği için aldığımız önlemler:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>SSL sertifikası ile şifrelenmiş veri iletimi</li>
                <li>Güvenli sunucu altyapısı</li>
                <li>Düzenli güvenlik güncellemeleri</li>
                <li>Sınırlı erişim kontrolleri</li>
                <li>Veri yedekleme ve kurtarma sistemleri</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Veri Saklama Süreleri
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <ul className="list-disc list-inside space-y-2">
                <li><strong>İletişim verileri:</strong> 5 yıl</li>
                <li><strong>Analitik veriler:</strong> 2 yıl</li>
                <li><strong>Log kayıtları:</strong> 1 yıl</li>
                <li><strong>Çerez verileri:</strong> Çerez türüne göre 1 gün - 2 yıl</li>
              </ul>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              İletişim
            </h2>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <p className="mb-4">
                Gizlilik politikası hakkında sorularınız için bizimle iletişime geçebilirsiniz:
              </p>
              <ul className="list-none space-y-2">
                <li><strong>E-posta:</strong> gizlilik@kolaykredi.com</li>
                <li><strong>Adres:</strong> Maslak Mahallesi, Büyükdere Cd. No:123, Sarıyer/İstanbul</li>
                <li><strong>KVKK Sorumlusu:</strong> kvkk@kolaykredi.com</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Politika Değişiklikleri
            </h2>
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <p>
                Bu gizlilik politikasında değişiklik yapma hakkımızı saklı tutarız. 
                Önemli değişiklikler durumunda sizi bilgilendireceğiz. Politikayı 
                düzenli olarak gözden geçirmenizi öneririz.
              </p>
            </div>
          </section>
        </div>
      </Container>
    </>
  )
}

export default Privacy