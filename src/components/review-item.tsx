import Image from 'next/image'
import Link from 'next/link'
import { formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Star } from '@phosphor-icons/react/dist/ssr'

interface IReviewItemProps {
  id: string
  rate: number
  description: string
  created_at: Date
  book_id: string
  user_id: string
  user: {
    id: string
    image: string | null
    name: string | null
  }
  book: {
    id: string
    name: string
    cover_url: string
    author: string
  }
}

export function ReviewItem(props: IReviewItemProps) {
  const createdDate = new Date(props.created_at)

  return (
    <article className="flex flex-col gap-8 rounded-lg bg-gray-700 p-6">
      <header className="flex items-start justify-between max-xs:flex-col max-xs:gap-2">
        <div className="flex items-start gap-4">
          <Link href={`/profile/${props.user_id}`}>
            <Image
              src={props.user.image || ''}
              alt=""
              width={40}
              height={40}
              className="aspect-square w-full rounded-full border border-blue-100 object-cover"
            />
          </Link>

          <div className="flex flex-col">
            <em className="leading-relaxed text-gray-100">{props.user.name}</em>
            <time
              className="text-sm leading-relaxed text-gray-400"
              title={createdDate.toLocaleDateString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
              dateTime={createdDate.toLocaleDateString('pt-BR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            >
              {formatDistance(createdDate, new Date(), {
                locale: ptBR,
              })}{' '}
              atrás
            </time>
          </div>
        </div>

        <div className="flex items-center gap-1 text-purple-100">
          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={16}
              weight={index < props.rate ? 'fill' : 'regular'}
            />
          ))}
        </div>
      </header>

      <Link
        href={`/book/${props.book_id}`}
        className="flex items-start gap-5 max-xs:flex-col max-xs:gap-3"
      >
        <div className="w-full max-w-[6.75rem] overflow-hidden rounded-[4px]">
          <Image
            src={`/${props.book.cover_url}`}
            alt=""
            width={108}
            height={152}
          />
        </div>

        <div className="flex flex-1 flex-col gap-5 max-xs:gap-2">
          <div className="flex flex-col">
            <strong className="leading-snug text-gray-100">
              {props.book.name}
            </strong>
            <p className="text-sm leading-relaxed text-gray-400">
              {props.book.author}
            </p>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            {props.description}
          </p>
        </div>
      </Link>
    </article>
  )
}
