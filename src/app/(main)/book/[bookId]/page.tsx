import { notFound } from 'next/navigation'

import { prisma } from '@/libs/prisma'

import { BookCard } from './components/book-card'
import { CommentForm } from './components/comment-form'

export default async function Book({ params }: { params: { bookId: string } }) {
  const bookData = await prisma.book.findUnique({
    where: {
      id: params.bookId,
    },
    include: {
      ratings: {
        orderBy: {
          created_at: 'desc',
        },
        include: {
          user: {
            select: {
              id: true,
              image: true,
              name: true,
            },
          },
        },
      },
      categories: {
        include: {
          category: true,
        },
      },
    },
  })

  if (bookData === null) {
    notFound()
  }

  return (
    <main className="h-[calc(100vh-2.5rem)] flex-1 space-y-10 overflow-y-scroll pr-5 pt-12 max-xl:mr-12 max-md:mr-0 max-md:pr-0 max-md:pt-[5.25rem]">
      <BookCard
        {...bookData}
        categories={bookData.categories.map((category) => category.category)}
      />

      <CommentForm reviews={[...bookData.ratings]} bookId={bookData.id} />
    </main>
  )
}
