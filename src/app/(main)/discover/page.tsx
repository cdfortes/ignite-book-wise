import { Binoculars } from '@phosphor-icons/react/dist/ssr'

import { prisma } from '@/libs/prisma'

import { SearchInput } from '@/components/search-input'
import { CategorySelector } from './components/category-selector'
import { InfiniteScroll } from '@/components/infinite-scroll'
import { getBooks } from '@/utils/getBooks'

export default async function Discover({
  searchParams,
}: {
  searchParams: { category: string | undefined; search: string | undefined }
}) {
  const totalBooks = await prisma.book.count({
    where: {
      categories: {
        some: {
          category: {
            name: searchParams.category,
          },
        },
      },
      AND: {
        OR: [
          {
            name: { contains: searchParams.search },
          },
          {
            author: { contains: searchParams.search },
          },
        ],
      },
    },
  })
  const initialBooks = await getBooks(
    0,
    searchParams.category,
    searchParams.search,
  )

  const availableCategories = await prisma.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  return (
    <main className="mr-24 h-[calc(100vh-2.5rem)] flex-1 overflow-hidden pt-12 max-xl:mr-12 max-md:mr-0 max-md:pt-[5.25rem]">
      <header className="mb-10 flex w-full items-center justify-between gap-5 max-md:mb-5 max-md:flex-col max-md:items-start">
        <div className="flex items-center gap-3">
          <Binoculars size={32} className="text-blue-100" />
          <strong className="text-2xl font-bold leading-snug text-gray-100">
            Explorar
          </strong>
        </div>

        <div className="w-full max-w-[26.5rem] max-md:max-w-none">
          <SearchInput placeholder="Buscar livro ou autor" />
        </div>
      </header>

      <section className="h-[calc(100%-5.5rem)]">
        <div className="mb-12 flex flex-wrap items-center justify-start gap-3">
          <CategorySelector categories={availableCategories} />
        </div>

        <ul
          key={Math.random()}
          className="grid h-[calc(100%-8.25rem)] grid-cols-3 items-start gap-5 overflow-y-scroll pr-5 max-lg:grid-cols-2 max-md:overflow-y-hidden max-md:pr-0 max-sm:grid-cols-1"
        >
          <InfiniteScroll
            totalItems={totalBooks}
            initialItems={initialBooks}
            type="books"
            bookCategory={searchParams.category}
          />

          {totalBooks === 0 && (
            <p className="col-span-full flex w-full justify-center text-sm leading-relaxed text-gray-300">
              Não foi encontrado nenhum livro{' '}
              {searchParams.category ? (
                <>
                  da categoria &apos;
                  <span className="font-bold text-blue-100">
                    {searchParams.category}
                  </span>
                  &apos;
                </>
              ) : (
                ''
              )}{' '}
              {searchParams.search ? (
                <>
                  com o termo &apos;
                  <span className="font-bold text-blue-100">
                    {searchParams.search}
                  </span>
                  &apos;
                </>
              ) : (
                ''
              )}
            </p>
          )}
        </ul>
      </section>
    </main>
  )
}
