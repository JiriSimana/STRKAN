import * as React from "react"

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'primary', size = 'md', ...props }, ref) => {
    // Flat UI, no border-radius, distinct brand colors
    const baseStyles = "inline-flex items-center justify-center font-bold uppercase tracking-wider transition-colors focus:outline-none focus:ring-2 focus:ring-brand-sky-blue focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
    
    const variants = {
      primary: "bg-brand-sky-blue text-brand-dark-blue hover:bg-[#3a9dbf]",
      secondary: "bg-brand-gray text-white hover:bg-brand-dark-blue",
      outline: "border-2 border-brand-dark-blue text-brand-dark-blue hover:bg-brand-dark-blue hover:text-white",
      ghost: "text-brand-dark-blue hover:bg-brand-clean-gray",
    };

    const sizes = {
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-14 px-8 text-base",
    };

    return (
      <button
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
