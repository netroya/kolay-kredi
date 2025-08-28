import React from 'react'
import { AlertCircle, X } from 'lucide-react'

interface ErrorMessageProps {
  message: string
  onClose?: () => void
  variant?: 'error' | 'warning' | 'info'
  className?: string
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  onClose,
  variant = 'error',
  className = ''
}) => {
  const variantClasses = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  }

  const iconColors = {
    error: 'text-red-500',
    warning: 'text-yellow-500',
    info: 'text-blue-500'
  }

  return (
    <div className={`
      relative p-4 border rounded-lg flex items-start space-x-3
      ${variantClasses[variant]} ${className}
    `}>
      <AlertCircle className={`w-5 h-5 mt-0.5 flex-shrink-0 ${iconColors[variant]}`} />
      <div className="flex-1">
        <p className="text-sm font-medium">{message}</p>
      </div>
      {onClose && (
        <button
          onClick={onClose}
          className={`
            p-1 rounded-md hover:bg-opacity-20 hover:bg-gray-600 transition-colors
            ${iconColors[variant]}
          `}
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}

export default ErrorMessage