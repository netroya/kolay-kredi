import React from 'react'

interface ResponsiveImageProps {
  src: string
  alt: string
  width: number
  height: number
  className?: string
  loading?: 'lazy' | 'eager'
  decoding?: 'async' | 'sync' | 'auto'
  srcSet?: string
  sizes?: string
  priority?: boolean
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  loading = 'lazy',
  decoding = 'async',
  srcSet,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  priority = false
}) => {
  // Generate srcSet if not provided (example for different sizes)
  const defaultSrcSet = srcSet || generateSrcSet(src)

  return (
    <img
      src={src}
      srcSet={defaultSrcSet}
      sizes={sizes}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? 'eager' : loading}
      decoding={decoding}
      fetchPriority={priority ? 'high' : 'auto'}
    />
  )
}

// Helper function to generate srcSet for different sizes
const generateSrcSet = (src: string): string => {
  const baseUrl = src.replace(/\.[^/.]+$/, '') // Remove extension
  const extension = src.match(/\.[^/.]+$/)?.[0] || '.jpg'
  
  // Generate different sizes (adjust based on your needs)
  const sizes = [400, 800, 1200, 1600]
  
  return sizes
    .map(size => `${baseUrl}-${size}w${extension} ${size}w`)
    .join(', ') + `, ${src} ${1920}w`
}

export default ResponsiveImage