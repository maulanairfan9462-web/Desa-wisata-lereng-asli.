import { useState } from 'react';
import { Mountain } from 'lucide-react';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
}

export function SafeImage({
  src,
  alt,
  className = 'w-full h-full object-cover',
  loading = 'lazy',
}: SafeImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="w-full h-full bg-gradient-to-br from-[#1b4d3e] via-[#2e7d5a] to-[#003629] flex flex-col items-center justify-center p-6 text-center text-[#fcf9f2]"
      >
        <Mountain className="w-10 h-10 mb-2 opacity-80" strokeWidth={1.5} />
        <span className="text-xs font-medium opacity-90 max-w-[22ch] leading-snug">
          {alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
