import Image from 'next/image';

interface BrandProps {
  className?: string;
  compact?: boolean;
}

export function Brand({ className = '' }: BrandProps) {
  return (
    <span className={`inline-flex items-center gap-2.5 cursor-pointer ${className}`}>
      <Image
        src="/logo.png"
        alt="Resume Maamey Logo"
        width={36}
        height={36}
        className="h-9 w-9 object-contain rounded-lg"
        priority
      />
      <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
        Resume Maamey
      </span>
    </span>
  );
}

export function Wordmark({ className = '', compact = false }: BrandProps) {
  return (
    <span className={`inline-flex items-center gap-2 cursor-pointer ${className}`}>
      <Image
        src="/logo.png"
        alt="Resume Maamey Logo"
        width={compact ? 28 : 34}
        height={compact ? 28 : 34}
        className={`${compact ? 'h-7 w-7' : 'h-8 w-8'} object-contain rounded-md`}
        priority
      />
      <span className={`font-bold tracking-tight text-slate-900 dark:text-white ${compact ? 'text-base' : 'text-lg'}`}>
        Resume Maamey
      </span>
    </span>
  );
}

export default Brand;