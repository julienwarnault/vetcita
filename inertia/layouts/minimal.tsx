import { Toaster } from 'sonner'
import { ReactElement } from 'react'
import { useFlashToasts } from '~/hooks/use_flash'

export default function MinimalLayout({ children }: { children: ReactElement }) {
  useFlashToasts()

  return (
    <>
      <div className="flex min-h-dvh flex-col bg-white">
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}
