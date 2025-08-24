interface LogBackInIconProps {
  variant?: 'brand' | 'secondary'
}

export default function LogBackInIcon({ variant = 'secondary' }: LogBackInIconProps) {
  const classes =
    variant === 'brand'
      ? 'fill-white dark:fill-neutral-200 h-5'
      : 'fill-neutral-700 dark:fill-neutral-300 h-5'

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={classes}
    >
      <path d="M8 10v-5l8 7-8 7v-5h-8v-4h8zm2-8v2h12v16h-12v2h14v-20h-14z" />
    </svg>
  )
}
