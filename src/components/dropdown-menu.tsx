'use client'

import { Session } from 'next-auth'
import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu'
import { List, ChartLineUp, Binoculars, User } from '@phosphor-icons/react'

import { NavLink } from '@/components/nav-link'
import { LogoutButton } from './logout-button'

export function DropdownMenu({ session }: { session: Session | null }) {
  function handleCloseDropdown() {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }))
  }

  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger className="text-gray-100">
        <List size={24} />
      </RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align="end"
          className="w-60 space-y-2 rounded-md bg-gray-700 p-6 shadow-lg"
        >
          <RadixDropdownMenu.Item>
            <NavLink href="/home" onClick={handleCloseDropdown}>
              <ChartLineUp size={24} />
              Início
            </NavLink>
          </RadixDropdownMenu.Item>

          <RadixDropdownMenu.Item>
            <NavLink href="/discover" onClick={handleCloseDropdown}>
              <Binoculars size={24} /> Explorar
            </NavLink>
          </RadixDropdownMenu.Item>

          {session && (
            <>
              <RadixDropdownMenu.Item>
                <NavLink
                  href={`/profile/${session.user.id}`}
                  onClick={handleCloseDropdown}
                >
                  <User size={24} />
                  Perfil
                </NavLink>
              </RadixDropdownMenu.Item>

              <RadixDropdownMenu.Separator className="h-[1px] bg-gray-500" />

              <RadixDropdownMenu.Item>
                <LogoutButton />
              </RadixDropdownMenu.Item>
            </>
          )}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  )
}
