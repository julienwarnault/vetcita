import { Toaster } from 'sonner'
import { ReactElement } from 'react'
import { useFlashToasts } from '~/hooks/use_flash'

interface AuthLayoutProps {
  children: ReactElement
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  useFlashToasts()

  return (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  )
}
