import { Toaster } from 'sonner'
import type { ReactElement } from 'react'
import authImageUrl from '~/assets/images/auth.jpg'
import { useFlashToasts } from '~/hooks/use_flash'

interface AuthLayoutProps {
  children: ReactElement
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  useFlashToasts()

  return (
    <>
      <div className="grid h-screen overflow-y-auto bg-white lg:grid-cols-[1fr_45%]">
        <div className="relative flex min-h-screen flex-col">{children}</div>
        <aside className="sticky top-0 hidden h-screen lg:block">
          <img src={authImageUrl} alt="" className="h-full w-full object-cover object-center" />
        </aside>
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}
