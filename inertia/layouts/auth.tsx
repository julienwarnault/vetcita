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
      <div className="grid h-screen overflow-y-auto bg-white lg:grid-cols-[1.5fr_1fr]">
        <div className="relative flex min-h-screen flex-col">{children}</div>

        <aside className="sticky top-0 hidden h-screen p-4 lg:block">
          <img src={authImageUrl} alt="" className="h-full w-full rounded-3xl object-cover object-center" />
        </aside>
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}
