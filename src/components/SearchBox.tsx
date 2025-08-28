import React, { useState, useEffect, useCallback } from 'react'
import { Search, X } from 'lucide-react'

interface SearchBoxProps {
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  onClear?: () => void
  className?: string
  size?: 'sm' | 'md' | 'lg'
  id?: string
  'aria-label'?: string
  'aria-describedby'?: string
}

const SearchBox: React.FC<SearchBoxProps> = ({
  placeholder = 'Arama yapın...',
  value = '',
  onChange,
  onClear,
  className = '',
  size = 'md',
  id = 'search-input',
  'aria-label': ariaLabel = 'Arama',
  'aria-describedby': ariaDescribedby
}) => {
  const [isFocused, setIsFocused] = useState(false)
  const [localValue, setLocalValue] = useState(value)

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  const iconSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }

  // Debounced onChange with 300ms delay
  const debouncedOnChange = useCallback(
    (searchValue: string) => {
      const timeoutId = setTimeout(() => {
        onChange?.(searchValue)
      }, 300)

      return () => clearTimeout(timeoutId)
    },
    [onChange]
  )

  useEffect(() => {
    const cleanup = debouncedOnChange(localValue)
    return cleanup
  }, [localValue, debouncedOnChange])

  useEffect(() => {
    setLocalValue(value)
  }, [value])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalValue(e.target.value)
  }

  const handleClear = () => {
    setLocalValue('')
    onChange?.('')
    onClear?.()
  }

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search 
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 ${iconSizeClasses[size]}`} 
        />
        <input
          type="text"
          id={id}
          value={localValue}
          onChange={handleChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          aria-label={ariaLabel}
          aria-describedby={ariaDescribedby}
          className={`
            w-full pl-10 pr-10 border rounded-lg bg-white
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            transition-all duration-200
            ${sizeClasses[size]}
            ${isFocused ? 'border-blue-300 shadow-md' : 'border-gray-300 hover:border-gray-400'}
            ${className}
          `}
        />
        {localValue && (
          <button
            onClick={handleClear}
            className={`
              absolute right-3 top-1/2 transform -translate-y-1/2 
              text-gray-400 hover:text-gray-600 transition-colors
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded
              p-1
            `}
            type="button"
            aria-label="Aramayı temizle"
          >
            <X className={iconSizeClasses[size]} />
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBox