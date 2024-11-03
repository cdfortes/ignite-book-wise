'use client'

import { usePathname } from 'next/navigation'
import Link, { LinkProps } from 'next/link'

interface INavLinkProps extends LinkProps {
  children: React.ReactNode
  className?: string
}

export function NavLink({ children, className, ...rest }: INavLinkProps) {
  const pathName = usePathname()
  const { href } = rest

  const isActive = pathName === href

  return (
    <Link
      {...rest}
      className={`flex items-center gap-3 py-2 leading-relaxed transition-colors hover:text-gray-100 ${isActive ? 'active-link relative font-bold text-gray-100' : 'font-normal text-gray-400'} ${className}`}
    >
      {children}
    </Link>
  )
}
