import { Toaster } from 'sonner'
import { ReactElement } from 'react'
import { cn } from 'tailwind-variants'
import { useFlashToasts } from '~/hooks/use_flash'

interface MinimalLayoutProps {
  children: ReactElement
  className?: string
}

export default function MinimalLayout({ children, className }: MinimalLayoutProps) {
  useFlashToasts()

  return (
    <>
      <div className={cn('flex min-h-dvh flex-col bg-white', className)}>
        <div className="flex flex-1 flex-col">{children}</div>
      </div>
      <Toaster position="top-center" richColors />
    </>
  )
}
