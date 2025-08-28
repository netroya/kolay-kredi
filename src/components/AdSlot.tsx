import React from 'react'

interface AdSlotProps {
  id?: string
  className?: string
  size?: 'banner' | 'rectangle' | 'leaderboard' | 'mobile-banner'
  style?: React.CSSProperties
}

const AdSlot: React.FC<AdSlotProps> = ({ 
  id = 'ad-slot',
  className = '',
  size = 'banner',
  style = {}
}) => {
  const sizeClasses = {
    'banner': 'w-full h-[250px] md:h-[300px]',
    'rectangle': 'w-full max-w-[300px] h-[250px]',
    'leaderboard': 'w-full h-[90px] md:h-[120px]',
    'mobile-banner': 'w-full h-[250px] md:hidden'
  }

  const baseClasses = `
    relative overflow-hidden rounded-lg border border-gray-200 
    bg-gray-50 flex items-center justify-center text-gray-400
    ${sizeClasses[size]} ${className}
  `

  return (
    <div 
      id={id}
      className={baseClasses}
      style={style}
    >
      <div className="text-center p-4">
        <div className="text-sm font-medium mb-1">Reklam Alanı</div>
        <div className="text-xs opacity-75">
          {size === 'leaderboard' && '728x90'}
          {size === 'banner' && '300x250'}
          {size === 'rectangle' && '300x250'}
          {size === 'mobile-banner' && '320x250'}
        </div>
      </div>
    </div>
  )
}

export default AdSlot