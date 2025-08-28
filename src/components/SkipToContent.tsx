import React from 'react'

const SkipToContent: React.FC = () => {
  return (
    <a
      href="#main-content"
      className={`
        sr-only focus:not-sr-only
        fixed top-4 left-4 z-[9999]
        bg-blue-600 text-white px-4 py-2 rounded-lg
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        font-medium text-sm
        transition-all duration-200
        transform -translate-y-full focus:translate-y-0
      `}
    >
      Ana içeriğe geç
    </a>
  )
}

export default SkipToContent