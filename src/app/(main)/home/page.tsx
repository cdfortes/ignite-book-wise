import Link from 'next/link'
import { ChartLineUp, CaretRight } from '@phosphor-icons/react/dist/ssr'

import { prisma } from '@/libs/prisma'
import { getReviews } from '@/utils/getReviews'

import { BookItem } from '@/components/book-item'
import { InfiniteScroll } from '@/components/infinite-scroll'

export default async function Home() {
  const totalReviews = await prisma.rating.count()
  const reviews = await getReviews()

  const trendingBooks = await prisma.book.findMany({
    take: 3,
    orderBy: {
      ratings: {
        _count: 'desc',
      },
    },
    include: {
      ratings: {
        select: {
          rate: true,
        },
      },
    },
  })

  return (
    <main className="mr-24 h-[calc(100vh-2.5rem)] flex-1 overflow-hidden pt-12 max-xl:mr-12 max-md:mr-0 max-md:pt-[5.25rem]">
      <header className="mb-10 flex items-center gap-3 max-md:mb-5">
        <ChartLineUp size={32} className="text-blue-100" />
        <h1 className="text-2xl font-bold leading-snug text-gray-100">
          Início
        </h1>
      </header>

      <div className="grid h-[calc(100%-4.5rem)] grid-cols-[minmax(30rem,_1fr)_minmax(auto,20rem)] gap-16 max-xl:grid-cols-1">
        <section className="overflow-y-scroll pr-5 max-md:overflow-y-hidden max-md:pr-0">
          <h2 className="pb-4 text-sm leading-relaxed text-gray-100">
            Avaliações mais recentes
          </h2>
          <ul className="flex flex-col gap-3">
            <InfiniteScroll
              totalItems={totalReviews}
              initialItems={reviews}
              type="reviews"
            />
          </ul>
        </section>

        <section className="overflow-hidden max-xl:hidden">
          <header className="flex flex-wrap items-baseline justify-between">
            <h2 className="pb-4 text-sm leading-relaxed text-gray-100">
              Livros populares
            </h2>
            <Link
              href="/discover"
              className="flex items-center gap-2 px-2 py-1 text-sm font-bold leading-relaxed text-purple-100 transition-colors hover:text-purple-200"
            >
              Ver todos <CaretRight size={16} />
            </Link>
          </header>

          <ul className="flex flex-col gap-3">
            {trendingBooks.map((book) => (
              <li key={book.id}>
                <BookItem {...book} imageSize="sm" />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
