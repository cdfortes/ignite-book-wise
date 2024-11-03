import { getServerSession } from 'next-auth'
import Image from 'next/image'
import { redirect } from 'next/navigation'

import heroImage from '@/assets/hero.png'
import logo from '@/assets/logo.svg'

import { authOptions } from '@/libs/auth-options'

import { LoginProviders } from './components/login-providers'

export default async function Login() {
  const isAuthenticated = await getServerSession(authOptions)

  if (isAuthenticated) {
    redirect('/home')
  }

  return (
    <main className="flex items-center justify-center p-5 max-lg:flex-col max-lg:gap-8">
      <div className="h-[57rem] w-[37.5rem] overflow-hidden rounded-[10px] max-lg:size-auto max-lg:rounded-none">
        <Image
          src={heroImage}
          alt="Imagem de uma mulher loira deitada no sofá com quatro almofadas, enquanto se concentra na leitura de um livro. A imagem está sobreposta por uma camada com cores azuladas, e no centro da foto em destaque, encontra-se a logo da plataforma BookWise"
          className="object-cover max-lg:hidden"
          priority
        />
        <Image
          src={logo}
          alt="Logo da plataforma BookWise."
          width={256}
          height={64}
          priority
          className="min-w-full"
        />
      </div>

      <article className="mx-auto flex max-w-96 flex-col gap-10">
        <div>
          <h1 className="mb-[2px] text-2xl font-bold leading-snug text-gray-100">
            Boas vindas!
          </h1>
          <p className="leading-relaxed text-gray-200">
            Faça seu login ou acesse como visitante.
          </p>
        </div>

        <LoginProviders includesVisitorOption />
      </article>
    </main>
  )
}
