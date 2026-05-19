import * as React from "react"
import { Link } from '@/i18n/navigation'
import Image from "next/image"

export interface CardProps {
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  className?: string;
}

export function Card({ title, description, imageSrc, imageAlt, href, className = '' }: CardProps) {
  const content = (
    <div className={`group flex flex-col h-full bg-white transition-shadow shadow-flat hover:shadow-card-hover border border-brand-clean-gray ${className}`}>
      {/* Top Image or Placeholder */}
      <div className="relative h-48 w-full overflow-hidden bg-brand-clean-gray border-b border-brand-gray/10">
        {imageSrc ? (
          <Image 
            src={imageSrc} 
            alt={imageAlt || title} 
            fill 
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center p-4 text-center">
            {/* TODO: replace with real image from /public/images/ */}
            <span className="text-brand-gray/60 font-medium text-sm">
              [Placeholder Obrázek]<br />Doplnit foto 4:3
            </span>
          </div>
        )}
      </div>
      
      <div className="flex-1 p-6 flex flex-col">
        <h3 className="text-xl font-bold text-brand-dark-blue mb-3 group-hover:text-brand-sky-blue transition-colors">
          {title}
        </h3>
        {description && (
          <p className="text-brand-gray text-sm flex-1 leading-relaxed">
            {description}
          </p>
        )}
        
        {/* Fake decorative arrow to imply link if href exists */}
        {href && (
          <div className="mt-6 flex items-center text-brand-sky-blue font-semibold text-xs uppercase tracking-wider group-hover:translate-x-1 transition-transform">
            Více informací <span className="ml-2">→</span>
          </div>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      <Link href={href as any} className="block h-full">
        {content}
      </Link>
    );
  }

  return content;
}
