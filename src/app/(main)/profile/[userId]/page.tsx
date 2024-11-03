/* eslint-disable @typescript-eslint/no-explicit-any */
import { notFound } from 'next/navigation'
import Image from 'next/image'
import {
  User,
  BookOpen,
  Books,
  UserList,
  BookmarkSimple,
} from '@phosphor-icons/react/dist/ssr'

import { prisma } from '@/libs/prisma'

import { InfiniteScroll } from '@/components/infinite-scroll'
import { SearchInput } from '@/components/search-input'

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

export default async function Profile({
  params,
  searchParams,
}: {
  params: { userId: string }
  searchParams: { search: string | undefined }
}) {
  const userInfo = await prisma.user.findUnique({
    where: {
      id: params.userId,
    },
    select: {
      image: true,
      name: true,
      Rating: {
        where:
          searchParams.search !== undefined
            ? {
                book: {
                  OR: [
                    { author: { contains: searchParams.search } },
                    { name: { contains: searchParams.search } },
                  ],
                },
              }
            : {},
        orderBy: {
          created_at: 'desc',
        },
        select: {
          id: true,
          book: {
            include: {
              categories: {
                include: {
                  category: true,
                },
              },
            },
          },
          book_id: true,
          user: true,
          user_id: true,
          rate: true,
          description: true,
          created_at: true,
        },
      },
    },
  })

  if (userInfo === null) {
    notFound()
  }

  const totalReviews = userInfo.Rating.length

  const {
    totalAmountOfPages,
    totalAmountOfBooks,
    totalAmountOfAuthor,
    categoriesRanking,
  } = userInfo.Rating.reduce(
    (acc, review) => {
      if (!acc.reviewedBooks.some((item) => item.book_id === review.book_id)) {
        acc.totalAmountOfPages += review.book.total_pages
        acc.totalAmountOfBooks += 1

        review.book.categories.forEach(({ category: { name } }) => {
          acc.categoriesRanking[name] = (acc.categoriesRanking[name] || 0) + 1
        })
      }

      if (
        !acc.reviewedBooks.some(
          (item) => item.book.author === review.book.author,
        )
      ) {
        acc.totalAmountOfAuthor += 1
      }

      acc.reviewedBooks.push(review)
      return acc
    },
    {
      reviewedBooks: [] as IReviewItemProps[],
      totalAmountOfPages: 0,
      totalAmountOfBooks: 0,
      totalAmountOfAuthor: 0,
      categoriesRanking: {} as any,
    },
  )

  const mostReadCategory = Object.entries(categoriesRanking).reduce(
    (acc: any, [category, amount]: any) => {
      if (amount > acc.amount) {
        acc = { category, amount }
      }
      return acc
    },
    { category: '', amount: 0 } as any,
  )

  return (
    <main className="mr-24 h-[calc(100vh-2.5rem)] flex-1 overflow-hidden pt-12 max-xl:mr-12 max-md:mr-0 max-md:pt-[5.25rem]">
      <header className="mb-10 flex items-center gap-3 max-md:mb-5">
        <User size={32} className="text-blue-100" />
        <h1 className="text-2xl font-bold leading-snug text-gray-100">
          Perfil
        </h1>
      </header>

      <div className="grid h-[calc(100%-4.5rem)] grid-cols-[minmax(30rem,_1fr)_minmax(auto,20rem)] gap-16 max-xl:grid-cols-1 max-xs:gap-5">
        <section className="space-y-8 overflow-y-scroll pr-5 max-xl:order-2 max-md:overflow-y-hidden max-md:pr-0">
          <div>
            <SearchInput placeholder="Buscar livro avaliado" />
          </div>
          <ul key={Math.random()} className="flex flex-col gap-3">
            {totalReviews > 0 ? (
              <InfiniteScroll
                totalItems={totalReviews}
                initialItems={userInfo.Rating}
                type="reviews"
              />
            ) : (
              <p className="w-full text-sm leading-relaxed text-gray-300">
                Nenhuma avaliação encontrada.
              </p>
            )}
          </ul>
        </section>

        <section className="overflow-y-scroll max-xl:order-1">
          <header className="flex w-full flex-col items-center gap-5">
            <Image
              width={72}
              height={72}
              className="aspect-square w-full max-w-[4.5rem] rounded-full border border-blue-100 object-cover"
              alt=""
              src={userInfo.image || '/images/default-avatar.png'}
            />
            <h2 className="text-xl font-bold leading-snug text-gray-100">
              {userInfo.name}
            </h2>
          </header>

          <ul className="mx-auto grid max-w-fit gap-10 py-5 max-xl:grid-cols-2">
            <li className="flex items-center gap-5 text-blue-100">
              <BookOpen size={32} />
              <div>
                <strong className="font-bold leading-snug text-gray-200">
                  {totalAmountOfPages}
                </strong>
                <p className="leading-relaxed text-gray-300">Páginas lidas</p>
              </div>
            </li>
            <li className="flex items-center gap-5 text-blue-100">
              <Books size={32} />
              <div>
                <strong className="font-bold leading-snug text-gray-200">
                  {totalAmountOfBooks}
                </strong>
                <p className="leading-relaxed text-gray-300">
                  Livros avaliados
                </p>
              </div>
            </li>
            <li className="flex items-center gap-5 text-blue-100">
              <UserList size={32} />
              <div>
                <strong className="font-bold leading-snug text-gray-200">
                  {totalAmountOfAuthor}
                </strong>
                <p className="leading-relaxed text-gray-300">Autores lidos</p>
              </div>
            </li>
            <li className="flex items-center gap-5 text-blue-100">
              <BookmarkSimple size={32} />
              <div>
                <strong className="font-bold leading-snug text-gray-200">
                  {mostReadCategory.category}
                </strong>
                <p className="leading-relaxed text-gray-300">
                  Categoria mais lida
                </p>
              </div>
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
