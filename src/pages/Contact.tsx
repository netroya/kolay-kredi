import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Container from '../components/Container'
import Button from '../components/Button'
import { Mail, Phone, MapPin, Clock, MessageCircle } from 'lucide-react'

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simüle edilmiş form gönderimi
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    setSubmitMessage('Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.')
    setFormData({ name: '', email: '', subject: '', message: '' })
    setIsSubmitting(false)
    
    // Mesajı 5 saniye sonra temizle
    setTimeout(() => setSubmitMessage(''), 5000)
  }

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'E-posta',
      content: 'info@kolaykredi.com',
      link: 'mailto:info@kolaykredi.com'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Telefon',
      content: '0850 123 45 67',
      link: 'tel:+908501234567'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Adres',
      content: 'Maslak Mahallesi, Büyükdere Cd. No:123, Sarıyer/İstanbul',
      link: ''
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Çalışma Saatleri',
      content: 'Hafta içi 09:00 - 18:00',
      link: ''
    }
  ]

  const subjects = [
    'Genel Bilgi',
    'Kredi Karşılaştırma',
    'Teknik Destek',
    'Şikayet',
    'Öneriler',
    'Diğer'
  ]

  return (
    <>
      <Helmet>
        <title>İletişim - Kolay Kredi</title>
        <meta name="description" content="Kolay Kredi ekibi ile iletişime geçin. Sorularınız, önerileriniz ve geri bildirimleriniz için bizimle iletişime geçebilirsiniz." />
        <link rel="canonical" href="https://netroya.github.io/kolay-kredi/iletisim" />
      </Helmet>

      <div className="py-12 bg-gradient-to-br from-blue-50 to-indigo-100">
        <Container>
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">
              İletişim
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sorularınız, önerileriniz veya geri bildirimleriniz için bizimle iletişime geçin. 
              Size yardımcı olmaktan memnuniyet duyarız.
            </p>
          </div>
        </Container>
      </div>

      <Container className="py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* İletişim Formu */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Bize Mesaj Gönderin
              </h2>
              
              {submitMessage && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
                  {submitMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-900 mb-2">
                      Ad Soyad *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="Adınızı ve soyadınızı girin"
                      aria-describedby="name-required"
                    />
                    <span id="name-required" className="sr-only">Bu alan zorunludur</span>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      E-posta *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      placeholder="E-posta adresinizi girin"
                      aria-describedby="email-required"
                    />
                    <span id="email-required" className="sr-only">Bu alan zorunludur</span>
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-900 mb-2">
                    Konu *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    aria-describedby="subject-required"
                  >
                    <option value="">Konu seçin</option>
                    {subjects.map(subject => (
                      <option key={subject} value={subject}>{subject}</option>
                    ))}
                  </select>
                  <span id="subject-required" className="sr-only">Bu alan zorunludur</span>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-900 mb-2">
                    Mesaj *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical transition-colors"
                    placeholder="Mesajınızı buraya yazın..."
                    aria-describedby="message-required"
                  />
                  <span id="message-required" className="sr-only">Bu alan zorunludur</span>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full"
                  size="lg"
                >
                  {isSubmitting ? 'Gönderiliyor...' : 'Mesaj Gönder'}
                </Button>
              </form>
            </div>

            {/* İletişim Bilgileri */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                İletişim Bilgileri
              </h2>

              <div className="space-y-6 mb-8">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {info.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {info.title}
                      </h3>
                      {info.link ? (
                        <a 
                          href={info.link}
                          className="text-gray-600 hover:text-blue-600 transition-colors"
                        >
                          {info.content}
                        </a>
                      ) : (
                        <p className="text-gray-600">{info.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* SSS Link */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center mb-3">
                  <MessageCircle className="w-6 h-6 text-blue-600 mr-3" />
                  <h3 className="font-semibold text-blue-900">
                    Sık Sorulan Sorular
                  </h3>
                </div>
                <p className="text-blue-800 mb-4">
                  Aradığınız cevap SSS bölümünde olabilir.
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.location.href = '/sss'}
                >
                  SSS'ye Git
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </>
  )
}

export default Contact