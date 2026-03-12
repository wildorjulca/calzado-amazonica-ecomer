'use client'

import ContentLoader from 'react-content-loader'

const ImageSkeleton = () => {
  return (
    <ContentLoader
      speed={0.6}              // 🔥 más rápido
      viewBox="0 0 400 400"
      backgroundColor="#e5e5e5"
      foregroundColor="#f5f5f5"
      className="absolute inset-0 w-full h-full"
    >
      <rect x="0" y="0" rx="12" ry="12" width="400" height="400" />
    </ContentLoader>
  )
}

export default ImageSkeleton
