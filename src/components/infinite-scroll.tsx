'use client'

import { useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'

import { getReviews } from '@/utils/getReviews'

import { ReviewItem } from '@/components/review-item'
import { FadeLoader } from 'react-spinners'
import { getBooks } from '@/utils/getBooks'
import { BookItem } from './book-item'

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

interface IBookProps {
  id: string
  name: string
  author: string
  cover_url: string
  ratings: {
    rate: number
  }[]
  categories: {
    book_id: string
    category_id: string
  }[]
}

interface IInfiniteScrollProps {
  totalItems: number
  initialItems: IReviewItemProps[] | IBookProps[] | undefined
  type: 'reviews' | 'books'
  userId?: string
  bookCategory?: string
}

export function InfiniteScroll({
  totalItems,
  initialItems,
  type,
  userId,
  bookCategory,
}: IInfiniteScrollProps) {
  const [items, setItems] = useState<(IReviewItemProps | IBookProps)[]>(
    initialItems || [],
  )
  const [page, setPage] = useState(0)
  const [ref, inView] = useInView()

  async function loadMoreItems() {
    const nextPage = page + 1
    const items =
      type === 'reviews'
        ? await getReviews(nextPage, userId)
        : await getBooks(nextPage, bookCategory)

    if (items.length) {
      setPage(nextPage)
      setItems((prevItems) => [...prevItems, ...items])
    }
  }

  useEffect(() => {
    if (inView) {
      loadMoreItems()
    }
  }, [inView])

  return (
    <>
      {items.map((item) => (
        <li key={item.id}>
          {type === 'reviews' ? (
            <ReviewItem {...(item as IReviewItemProps)} />
          ) : (
            <BookItem {...(item as IBookProps)} />
          )}
        </li>
      ))}

      {items.length < totalItems && (
        <div ref={ref} className="col-span-full flex w-full justify-center">
          <FadeLoader color="#fff" />
        </div>
      )}
    </>
  )
}
