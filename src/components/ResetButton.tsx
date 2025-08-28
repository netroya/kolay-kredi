import React from 'react'
import { RotateCcw } from 'lucide-react'
import Button from './Button'

interface ResetButtonProps {
  onReset: () => void
  disabled?: boolean
  className?: string
  size?: 'sm' | 'md' | 'lg'
  showIcon?: boolean
}

const ResetButton: React.FC<ResetButtonProps> = ({
  onReset,
  disabled = false,
  className = '',
  size = 'md',
  showIcon = true
}) => {
  return (
    <Button
      variant="outline"
      size={size}
      onClick={onReset}
      disabled={disabled}
      className={`flex items-center gap-2 ${className}`}
    >
      {showIcon && <RotateCcw className="w-4 h-4" />}
      Sıfırla
    </Button>
  )
}

export default ResetButton