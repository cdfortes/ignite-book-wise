'use client'
import { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

import googleLogo from '@/assets/google.svg'
import githubLogo from '@/assets/github.svg'
import rocketLogo from '@/assets/rocket.svg'

interface IAuthOptionsProps {
  includesVisitorOption?: boolean
}

export function LoginProviders({
  includesVisitorOption = false,
}: IAuthOptionsProps) {
  const [authenticationInProgress, setAuthenticationInProgress] =
    useState(false)
  const router = useRouter()

  async function handleAuthentication(provider: string) {
    setAuthenticationInProgress(true)

    if (provider === 'visitor') {
      router.push('/home')
      return
    }

    await signIn(provider)
  }

  return (
    <ul className="flex flex-col gap-4">
      <li>
        <button
          className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 text-lg font-bold leading-relaxed text-gray-200 transition-colors disabled:cursor-not-allowed disabled:opacity-60 [&:not(:disabled)]:hover:bg-gray-700"
          onClick={() => handleAuthentication('google')}
          disabled={authenticationInProgress}
        >
          <Image src={googleLogo} alt="logo da Googl" width={32} height={32} />
          Entrar com Google
        </button>
      </li>
      <li>
        <button
          className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 text-lg font-bold leading-relaxed text-gray-200 transition-colors disabled:cursor-not-allowed disabled:opacity-60 [&:not(:disabled)]:hover:bg-gray-700"
          onClick={() => handleAuthentication('github')}
          disabled={authenticationInProgress}
        >
          <Image src={githubLogo} alt="logo do GitHub" width={32} height={32} />
          Entrar com GitHub
        </button>
      </li>
      {includesVisitorOption && (
        <li>
          <button
            className="flex w-full cursor-pointer items-center gap-5 rounded-lg bg-gray-600 px-6 py-5 text-lg font-bold leading-relaxed text-gray-200 transition-colors disabled:cursor-not-allowed disabled:opacity-60 [&:not(:disabled)]:hover:bg-gray-700"
            onClick={() => handleAuthentication('visitor')}
            disabled={authenticationInProgress}
          >
            <Image
              src={rocketLogo}
              alt="Ícone de um foguete roxo decolando"
              width={32}
              height={32}
            />
            Acessar como visitante
          </button>
        </li>
      )}
    </ul>
  )
}
