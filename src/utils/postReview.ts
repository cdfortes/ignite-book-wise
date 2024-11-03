'use server'

import { prisma } from '@/libs/prisma'

interface IPostReviewBody {
  userId: string
  bookId: string
  comment: string
  rating: number
}

export async function postReview(body: IPostReviewBody) {
  const response = await prisma.rating.create({
    data: {
      user_id: body.userId,
      book_id: body.bookId,
      description: body.comment,
      rate: body.rating,
    },
  })
  return response
}
