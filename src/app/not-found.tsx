import Image from 'next/image'
import Link from 'next/link'

import logo from '@/assets/logo.svg'

export default function NotFound() {
  return (
    <main className="flex h-screen w-screen flex-col items-center justify-center">
      <Image
        src={logo}
        alt="Logo da plataforma BookWise."
        width={256}
        height={64}
        priority
        className="mb-6"
      />

      <h1 className="mb-2 text-3xl font-bold leading-snug text-white max-xs:text-2xl">
        Página não encontrada!
      </h1>
      <Link
        href="/"
        className="font-medium leading-relaxed text-blue-100 underline hover:text-blue-200"
      >
        Voltar para o início
      </Link>
    </main>
  )
}
