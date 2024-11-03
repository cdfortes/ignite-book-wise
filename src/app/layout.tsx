import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/libs/auth-options'
import { SessionContext } from '@/contexts/session-context'

import '@/app/globals.css'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-nunito',
})

export const metadata: Metadata = {
  title: 'Bookwise',
  description: 'Aplicação de avaliação de livros',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const session = await getServerSession(authOptions)

  return (
    <html lang="pt-BR">
      <body
        className={`${nunito.variable} bg-gray-800 font-normal text-gray-100`}
      >
        <SessionContext session={session}>{children}</SessionContext>
      </body>
    </html>
  )
}
