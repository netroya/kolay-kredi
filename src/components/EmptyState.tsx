import React from 'react'
import { Search, Filter, FileX } from 'lucide-react'
import Button from './Button'

interface EmptyStateProps {
  title?: string
  description?: string
  icon?: 'search' | 'filter' | 'file' | 'custom'
  customIcon?: React.ReactNode
  showClearFilters?: boolean
  onClearFilters?: () => void
  className?: string
  children?: React.ReactNode
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'Sonuç bulunamadı',
  description = 'Aradığınız kriterlere uygun sonuç bulunamadı. Filtreleri değiştirerek tekrar deneyin.',
  icon = 'search',
  customIcon,
  showClearFilters = true,
  onClearFilters,
  className = '',
  children
}) => {
  const getIcon = () => {
    if (customIcon) return customIcon

    const iconProps = "w-12 h-12 text-gray-400"
    
    switch (icon) {
      case 'filter':
        return <Filter className={iconProps} />
      case 'file':
        return <FileX className={iconProps} />
      case 'search':
      default:
        return <Search className={iconProps} />
    }
  }

  return (
    <div className={`text-center py-12 px-6 ${className}`}>
      {/* Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
          {getIcon()}
        </div>
      </div>

      {/* Title */}
      <h3 className="text-xl font-semibold text-gray-900 mb-3">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 max-w-md mx-auto mb-8 leading-relaxed">
        {description}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        {showClearFilters && onClearFilters && (
          <Button
            variant="outline"
            onClick={onClearFilters}
            className="flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filtreleri Temizle
          </Button>
        )}

        {children}
      </div>

      {/* Additional suggestions */}
      <div className="mt-8 text-sm text-gray-500">
        <p className="mb-2">Öneriler:</p>
        <ul className="space-y-1">
          <li>• Arama terimlerinizi kontrol edin</li>
          <li>• Daha genel kriterler kullanın</li>
          <li>• Farklı filtre kombinasyonları deneyin</li>
        </ul>
      </div>
    </div>
  )
}

export default EmptyState