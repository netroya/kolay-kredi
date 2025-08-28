import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  as?: React.ElementType
  to?: string
}

const Button: React.FC<ButtonProps> = ({
  variant = 'default',
  size = 'md',
  loading = false,
  children,
  className = '',
  disabled,
  as: Component = 'button',
  'aria-label': ariaLabel,
  'aria-describedby': ariaDescribedby,
  'aria-expanded': ariaExpanded,
  ...props
}) => {
  const baseClasses = `
    inline-flex items-center justify-center rounded-lg font-medium 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500
    disabled:opacity-50 disabled:pointer-events-none
    active:scale-[0.98]
  `

  const variants = {
    default: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 bg-white',
    ghost: 'text-blue-600 hover:bg-blue-50',
    destructive: 'bg-red-600 text-white hover:bg-red-700 shadow-sm'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm min-h-[36px]',
    md: 'px-4 py-3 text-base min-h-[44px]',
    lg: 'px-6 py-4 text-lg min-h-[52px]'
  }

  const classes = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${loading ? 'cursor-wait' : ''}
    ${className}
  `.trim()

  const isDisabled = disabled || loading

  // Accessibility attributes
  const accessibilityProps = {
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedby,
    'aria-expanded': ariaExpanded,
    'aria-disabled': isDisabled,
    tabIndex: isDisabled ? -1 : 0,
    role: Component === 'button' ? undefined : 'button'
  }

  const buttonContent = (
    <>
      {loading && (
        <svg
          className="animate-spin -ml-1 mr-2 h-4 w-4"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      <span className={loading ? 'opacity-75' : ''}>{children}</span>
    </>
  )

  return (
    <Component
      className={classes}
      disabled={isDisabled}
      {...accessibilityProps}
      {...props}
    >
      {buttonContent}
    </Component>
  )
}

export default Button