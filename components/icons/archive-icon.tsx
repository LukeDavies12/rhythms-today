interface IconProps {
  size?: number;
  className?: string;
}

export default function ArchiveIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      xmlns="http://www.w3.org/2000/svg" 
      fillRule="evenodd" 
      clipRule="evenodd"
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M18.546 1l5.454 6.986v15.014h-24v-15.014l5.477-6.986h13.069zm-5.546 14v-3h-2v3h-3l4 4 4-4h-3zm8.474-7l-3.906-5h-11.085l-3.951 5h18.942z"/>
    </svg>
  );
}