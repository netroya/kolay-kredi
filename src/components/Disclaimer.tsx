import React from 'react'
import { AlertTriangle, Info } from 'lucide-react'

interface DisclaimerProps {
  type?: 'calculation' | 'general' | 'warning'
  className?: string
  children?: React.ReactNode
}

const Disclaimer: React.FC<DisclaimerProps> = ({
  type = 'calculation',
  className = '',
  children
}) => {
  const getContent = () => {
    switch (type) {
      case 'calculation':
        return (
          <>
            <div className="flex items-center mb-3">
              <Info className="w-5 h-5 text-blue-600 mr-2 flex-shrink-0" />
              <h4 className="font-semibold text-blue-900">Hesaplama Uyarısı</h4>
            </div>
            <div className="text-sm text-blue-800 space-y-2">
              <p>
                • Bu hesaplamalar <strong>bilgilendirme amaçlıdır</strong> ve kesin sonuç değildir.
              </p>
              <p>
                • Gerçek faiz oranları ve koşullar bankalar tarafından belirlenir.
              </p>
              <p>
                • Kredi onayı bankanın değerlendirmesine tabidir.
              </p>
              <p>
                • Kesin bilgi için ilgili bankaya başvurunuz.
              </p>
            </div>
          </>
        )
      
      case 'warning':
        return (
          <>
            <div className="flex items-center mb-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" />
              <h4 className="font-semibold text-amber-900">Önemli Uyarı</h4>
            </div>
            <div className="text-sm text-amber-800">
              {children || (
                <p>
                  Finansal kararlarınızı vermeden önce detaylı araştırma yapın ve 
                  gerektiğinde profesyonel finansal danışmanlık alın.
                </p>
              )}
            </div>
          </>
        )
      
      case 'general':
      default:
        return children
    }
  }

  const typeStyles = {
    calculation: 'bg-blue-50 border-blue-200',
    warning: 'bg-amber-50 border-amber-200',
    general: 'bg-gray-50 border-gray-200'
  }

  return (
    <div className={`border rounded-lg p-4 ${typeStyles[type]} ${className}`} role="note">
      {getContent()}
    </div>
  )
}

export default Disclaimer