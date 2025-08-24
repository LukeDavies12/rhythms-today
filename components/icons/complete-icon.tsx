interface IconProps {
  size?: number;
  className?: string;
}

export default function CompleteIcon({ size = 24, className = "" }: IconProps) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d="M9 22l-10-10.598 2.798-2.859 7.149 7.473 13.144-14.016 2.909 2.806z"/>
    </svg>
  );
}