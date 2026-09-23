export function Brand({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 cursor-pointer ${className}`}>
      <img
        src="/logo.png"
        alt="Resume Maamey Logo"
        className="h-9 w-9 object-contain rounded-lg"
      />
      <span className="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
        Resume Maamey
      </span>
    </span>
  );
}

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2.5 cursor-pointer ${className}`}>
      <img
        src="/logo.png"
        alt="Resume Maamey Logo"
        className="h-8 w-8 object-contain rounded-md"
      />
      <span className="font-bold text-base tracking-tight text-slate-900 dark:text-white">
        Resume Maamey
      </span>
    </span>
  );
}

export default Brand;