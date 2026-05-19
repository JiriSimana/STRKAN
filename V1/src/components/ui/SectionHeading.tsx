import * as React from "react"

export function SectionHeading({ 
  title, 
  subtitle, 
  align = 'left',
  theme = 'dark'
}: { 
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  theme?: 'dark' | 'light';
}) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
      <h2 className={`text-heading-2 md:text-heading-1 font-bold tracking-tight mb-4 ${theme === 'dark' ? 'text-brand-dark-blue' : 'text-white'}`}>
        {title}
      </h2>
      {/* Decorative Brand Line */}
      <div className={`h-1 w-20 bg-brand-sky-blue ${align === 'center' ? 'mx-auto' : ''} mb-6`} />
      
      {subtitle && (
        <p className={`text-lg max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${theme === 'dark' ? 'text-brand-gray' : 'text-brand-clean-gray'}`}>
          {subtitle}
        </p>
      )}
    </div>
  )
}
