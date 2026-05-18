import { Toaster } from 'sonner'
import { ReactElement } from 'react'
import { usePage } from '@inertiajs/react'
import type { Data } from '@generated/data'
import { AppSidebar } from '~/components/app_sidebar'
import { AppHeader } from '~/components/app_header'
import { useFlashToasts } from '~/hooks/use_flash'

export default function Layout({ children }: { children: ReactElement }) {
  useFlashToasts()

  const { user } = usePage<Data.SharedProps>().props

  return (
    <>
      <div className="flex h-dvh flex-col overflow-hidden">
        <AppHeader fullName={user?.fullName ?? ''} />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col overflow-hidden bg-white">{children}</main>
        </div>
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}
