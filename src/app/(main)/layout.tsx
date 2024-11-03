import { Header } from '@/components/header'
import { Sidebar } from '@/components/sidebar'

export default async function SidebarLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div className="flex gap-24 p-5 max-xl:gap-12 max-md:flex-col">
      <Sidebar />
      <Header />
      {children}
    </div>
  )
}
