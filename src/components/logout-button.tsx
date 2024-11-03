'use client'

import { ButtonHTMLAttributes } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { SignIn, SignOut } from '@phosphor-icons/react'

export function LogoutButton(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  const { status, data } = useSession()
  const isAuthenticated = status === 'authenticated'

  if (!isAuthenticated) {
    return (
      <button
        {...props}
        className="mt-auto w-full max-w-36 font-bold leading-relaxed text-gray-200 transition-colors hover:text-gray-100"
      >
        <Link
          href="/"
          className=" flex w-full items-center justify-center gap-3 py-2"
        >
          Fazer login <SignIn size={20} className="text-blue-100" />
        </Link>
      </button>
    )
  }

  return (
    <button
      {...props}
      onClick={async () => await signOut()}
      className="group mt-auto flex w-full max-w-36 items-center gap-3 py-2 font-normal leading-relaxed text-gray-200 transition-colors"
    >
      <Image
        src={data?.user?.image as string}
        alt=""
        width={32}
        height={32}
        className="aspect-square rounded-full border border-blue-100 object-cover"
      />
      <span className="flex-1 truncate">{data?.user?.name}</span>
      <SignOut
        size={20}
        className="min-w-5 text-red-500 group-hover:text-red-300"
      />
    </button>
  )
}
