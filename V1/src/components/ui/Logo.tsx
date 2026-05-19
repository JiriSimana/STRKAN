import { Link } from '@/i18n/navigation';
// import Image from 'next/image';

interface LogoProps {
  variant?: 'colored' | 'inverse';
}

export function Logo({ variant = 'colored' }: LogoProps) {
  // TODO: replace with real image from /public/logo-color.svg or logo-white.svg
  // return (
  //   <Link href="/" className="flex-shrink-0 flex items-center">
  //     <Image 
  //       src={variant === 'inverse' ? "/logo-white.svg" : "/logo-color.svg"} 
  //       alt="STRKAN Logo" 
  //       width={150} 
  //       height={40} 
  //       priority
  //     />
  //   </Link>
  // );

  return (
    <Link href="/" className="flex-shrink-0 flex items-center gap-1 font-bold text-2xl tracking-tight">
      {variant === 'inverse' ? (
        <span className="text-white">STR<span className="text-brand-clean-gray">KAN</span></span>
      ) : (
        <span className="text-brand-sky-blue">STR<span className="text-brand-gray">KAN</span></span>
      )}
    </Link>
  );
}
