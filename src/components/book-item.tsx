import Image from 'next/image'
import { Star } from '@phosphor-icons/react/dist/ssr'
import Link from 'next/link'

interface IBookItemProps {
  id: string
  name: string
  author: string
  cover_url: string
  ratings: {
    rate: number
  }[]
  imageSize?: 'sm' | 'md'
}

export function BookItem({ imageSize = 'md', ...props }: IBookItemProps) {
  const totalStars = Math.round(
    props.ratings.reduce((acc, item) => (acc += item.rate), 0) /
      props.ratings.length,
  )

  return (
    <Link
      href={`/book/${props.id}`}
      className="flex w-full gap-5 rounded-lg bg-gray-700 px-5 py-4"
    >
      <div
        className={` ${imageSize === 'md' ? 'max-w-[6.75rem]' : 'max-w-[4rem]'} flex-1 overflow-hidden rounded-[4px]`}
      >
        <Image src={`/${props.cover_url}`} alt="" width={108} height={152} />
      </div>

      <div className="flex flex-1 flex-col justify-between overflow-hidden">
        <div className="flex flex-col">
          <strong className="truncate leading-snug text-gray-100">
            {props.name}
          </strong>
          <p className="text-sm leading-relaxed text-gray-400">
            {props.author}
          </p>
        </div>

        <div className="flex items-center gap-1 text-purple-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              weight={index < totalStars ? 'fill' : 'regular'}
            />
          ))}
        </div>
      </div>
    </Link>
  )
}
