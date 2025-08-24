interface IconProps {
  size?: number;
  className?: string;
}

export default function RemoveIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M0 9h24v6h-24z"/>
    </svg>
  );
}