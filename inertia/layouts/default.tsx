import { Toaster } from 'sonner'
import { ReactElement } from 'react'
import { ConfirmDialog } from '~/components/ui/confirm_dialog'
import { AppSidebar } from '~/components/app_sidebar'
import { AppHeader } from '~/components/app_header'
import { useFlashToasts } from '~/hooks/use_flash'
import usePageProps from '~/hooks/use_page_props'

export default function Layout({ children }: { children: ReactElement }) {
  useFlashToasts()

  const { user } = usePageProps()

  return (
    <>
      <div className="flex h-dvh flex-col overflow-hidden">
        <AppHeader fullName={user?.agenda?.name ?? ''} businessName={user?.agenda?.tenant?.name} />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex flex-1 flex-col overflow-y-auto bg-white">{children}</main>
        </div>
      </div>

      <ConfirmDialog />

      <Toaster position="top-center" richColors />
    </>
  )
}
