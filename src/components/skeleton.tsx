interface ISkeletonProps {
  amount: number
  className?: string
}

export function Skeleton({ amount, className }: ISkeletonProps) {
  return Array(amount)
    .fill(0)
    .map((_, index) => (
      <span
        key={index}
        className={`block size-12 w-full animate-pulse rounded-full bg-gray-400 ${className}`}
      ></span>
    ))
}
