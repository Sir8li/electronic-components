import { useState, useEffect } from 'react';
import { getImageUrl } from '../config/storage';
import './LazyImage.css';

interface LazyImageProps {
  src: string;
  alt: string;
  size?: 'full' | 'thumbnail';
  className?: string;
}

function LazyImage({ src, alt, size = 'full', className = '' }: LazyImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);
  
  // 支持外部URL或本地路径
  const imageUrl = src.startsWith('http') ? src : getImageUrl(src, size);
  
  return (
    <div className={`lazy-image-container ${className}`}>
      {!isLoaded && !error && (
        <div className="image-placeholder">
          <div className="loading-spinner"></div>
        </div>
      )}
      {error && (
        <div className="image-error">
          <span>图片加载失败</span>
        </div>
      )}
      <img
        src={imageUrl}
        alt={alt}
        className={`lazy-image ${isLoaded ? 'loaded' : ''}`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    </div>
  );
}

export default LazyImage;
