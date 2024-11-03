'use client'

import { InputHTMLAttributes, useState } from 'react'

import { Star } from '@phosphor-icons/react'

interface IStarRatingProps extends InputHTMLAttributes<HTMLInputElement> {
  amountOfStars?: number
  error?: string
}

export function StarRating({
  amountOfStars = 5,
  error,
  onChange: externalOnChange,
  ...rest
}: IStarRatingProps) {
  const [rating, setRating] = useState<number | null>(null)
  const [hover, setHover] = useState<number | null>(null)

  return (
    <span>
      <div
        className={`flex items-center gap-1 ${error ? 'text-red-400' : 'text-purple-100'}`}
      >
        {Array.from({ length: amountOfStars }).map((_, index) => {
          const currentRating = index + 1

          return (
            <label key={index}>
              <input
                type="radio"
                value={currentRating}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (externalOnChange) {
                    externalOnChange(e)
                  }
                  setRating(currentRating)
                }}
                className="hidden"
                {...rest}
              />

              <span
                className="cursor-pointer"
                onMouseEnter={() => setHover(currentRating)}
                onMouseLeave={() => setHover(null)}
              >
                <Star
                  size={28}
                  weight={
                    currentRating <= (hover ?? rating ?? 0) ? 'fill' : 'regular'
                  }
                />
              </span>
            </label>
          )
        })}
      </div>

      {error && (
        <small className="text-xs leading-snug text-red-400">
          Insira uma nota
        </small>
      )}
    </span>
  )
}
