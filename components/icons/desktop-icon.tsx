interface IconProps {
  size?: number;
  className?: string;
}

export default function DesktopIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M0 0v18h24v-18h-24zm22 16h-20v-14h20v14zm-3 6v2h-14v-2h4v-2h6v2h4z"/>
    </svg>
  );
}