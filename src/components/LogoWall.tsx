import React from 'react'
import { BANKS } from '../data/banks'

interface LogoWallProps {
  className?: string
  showNames?: boolean
  maxLogos?: number
}

const LogoWall: React.FC<LogoWallProps> = ({ 
  className = '',
  showNames = false,
  maxLogos 
}) => {
  const displayBanks = maxLogos ? BANKS.slice(0, maxLogos) : BANKS

  return (
    <div className={`${className}`}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {displayBanks.map((bank) => (
          <div key={bank.slug} className="aspect-[3/1] bg-white rounded-xl border border-neutral-200 p-4 flex flex-col hover:shadow-md transition-shadow duration-200">
            <a
              href={bank.homepage}
              target="_blank"
              rel="nofollow noopener"
              className="flex-1 flex items-center justify-center"
            >
              <img
                src={bank.logo}
                alt={`${bank.name} logosu`}
                width={240}
                height={88}
                className="max-w-full h-auto object-contain"
                loading="lazy"
                decoding="async"
              />
            </a>
            {showNames && (
              <div className="mt-2 text-center">
                <p className="text-xs font-medium text-gray-900 truncate">
                  {bank.name}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default LogoWall