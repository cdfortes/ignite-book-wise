'use server'

import { prisma } from '@/libs/prisma'

export async function getBooks(
  page = 0,
  selectedCategory: string | undefined = undefined,
  queryParam: string | undefined = undefined,
) {
  const books = await prisma.book.findMany({
    skip: page * 10,
    take: 10,
    where: {
      categories: {
        some: {
          category: {
            name: selectedCategory,
          },
        },
      },
      AND: {
        OR: [
          {
            name: { contains: queryParam },
          },
          {
            author: { contains: queryParam },
          },
        ],
      },
    },
    select: {
      id: true,
      name: true,
      author: true,
      cover_url: true,
      ratings: true,
      categories: true,
    },
  })

  return books
}
