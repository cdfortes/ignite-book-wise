import Image from 'next/image'
import { getServerSession } from 'next-auth'
import { ChartLineUp, Binoculars, User } from '@phosphor-icons/react/dist/ssr'

import { authOptions } from '@/libs/auth-options'
import Logo from '@/assets/logo.svg'

import { NavLink } from '@/components/nav-link'
import { LogoutButton } from '@/components/logout-button'

export async function Sidebar() {
  const session = await getServerSession(authOptions)

  return (
    <aside className="flex h-[calc(100vh-2.5rem)] min-w-60 flex-col gap-16 rounded-xl bg-sidebar bg-center bg-no-repeat px-12 pb-6 pt-10 max-md:hidden">
      <div className="mx-auto max-h-8 max-w-32">
        <Image src={Logo} alt="Logo da Bookwise" />
      </div>

      <nav className="mx-auto flex max-w-fit flex-col gap-4">
        <NavLink href="/home">
          <ChartLineUp size={24} />
          Início
        </NavLink>
        <NavLink href="/discover">
          <Binoculars size={24} /> Explorar
        </NavLink>

        {session && (
          <NavLink href={`/profile/${session.user.id}`}>
            <User size={24} />
            Perfil
          </NavLink>
        )}
      </nav>

      <LogoutButton />
    </aside>
  )
}
