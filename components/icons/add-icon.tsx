interface IconProps {
  size?: number;
  className?: string;
}

export default function AddIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M24 9h-9v-9h-6v9h-9v6h9v9h6v-9h9z"/>
    </svg>
  );
}