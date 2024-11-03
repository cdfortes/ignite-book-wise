import Image from 'next/image'
import { BookOpen, BookmarkSimple, Star } from '@phosphor-icons/react/dist/ssr'

interface IBookItemProps {
  id: string
  name: string
  author: string
  cover_url: string
  summary: string
  ratings: {
    rate: number
  }[]
  categories: {
    id: string
    name: string
  }[]
  total_pages: number
}

export function BookCard(props: IBookItemProps) {
  const totalStars = Math.round(
    props.ratings.reduce((acc, item) => (acc += item.rate), 0) /
      props.ratings.length,
  )

  return (
    <section className="mx-auto w-full space-y-10 rounded-[10px] bg-gray-700 px-8 pb-4 pt-6">
      <div className="flex w-full flex-wrap items-stretch gap-8 max-sm:justify-center">
        <Image
          src={`/${props.cover_url}`}
          alt=""
          width={160}
          height={240}
          className="size-full max-w-[10rem] rounded-lg"
        />

        <div className="flex min-w-40 flex-1 flex-col justify-between gap-5">
          <div className="space-y-2">
            <h2 className="text-lg leading-snug text-gray-100">{props.name}</h2>
            <p className="leading-relaxed text-gray-300">{props.author}</p>

            <p className="mt-4 text-sm leading-relaxed text-gray-400">
              {props.summary}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1 text-purple-100">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  weight={index < totalStars ? 'fill' : 'regular'}
                />
              ))}
            </div>
            <span className="mt-4 block text-sm leading-relaxed text-gray-400">
              {props.ratings.length} avaliações
            </span>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-wrap items-center gap-14 border-t border-gray-600 py-6 max-sm:flex-col max-sm:items-start max-xs:gap-5">
        <div className="flex items-center gap-4">
          <BookmarkSimple size={24} className="text-blue-100" />
          <div>
            <p className="text-sm leading-relaxed text-gray-300">Categoria</p>
            <strong className="font-bold leading-snug text-gray-200">
              {props.categories.map((category) => category.name).join(', ')}
            </strong>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <BookOpen size={24} className="text-blue-100" />
          <div>
            <p className="text-sm leading-relaxed text-gray-300">Páginas</p>
            <strong className="font-bold leading-snug text-gray-200">
              {props.total_pages}
            </strong>
          </div>
        </div>
      </div>
    </section>
  )
}
