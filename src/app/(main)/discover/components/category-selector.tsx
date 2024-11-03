'use client'

import { useSearchParams, useRouter, usePathname } from 'next/navigation'

interface ICategoriesProps {
  id: string
  name: string
}

interface ICategorySelectorProps {
  categories: ICategoriesProps[]
}

export function CategorySelector({ categories }: ICategorySelectorProps) {
  const pathName = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()

  const activeCategory = searchParams.get('category')

  function handleSelectCategory(value: string | null) {
    const currentParams = new URLSearchParams(
      Array.from(searchParams.entries()),
    )

    if (!value) {
      currentParams.delete('category')
    } else {
      currentParams.set('category', value)
    }

    router.push(`${pathName}?${currentParams.toString()}`)
  }

  return (
    <>
      <button
        data-selected={!activeCategory}
        className="flex items-center justify-center gap-2 rounded-full border border-purple-100 bg-transparent px-4 py-1 leading-relaxed text-purple-100 data-[selected=true]:border-purple-200 data-[selected=true]:bg-purple-200 data-[selected=true]:text-gray-100"
        onClick={() => handleSelectCategory(null)}
      >
        Tudo
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          data-selected={activeCategory === category.name}
          className="flex items-center justify-center gap-2 rounded-full border border-purple-100 bg-transparent px-4 py-1 leading-relaxed text-purple-100 data-[selected=true]:border-purple-200 data-[selected=true]:bg-purple-200 data-[selected=true]:text-gray-100"
          onClick={() => handleSelectCategory(category.name)}
        >
          {category.name}
        </button>
      ))}
    </>
  )
}
