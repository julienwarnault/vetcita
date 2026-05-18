import { ReactNode } from 'react'
import { cn } from 'tailwind-variants'

interface FormHeaderProps {
  title: string
  children?: ReactNode
}

export function FormHeader(props: FormHeaderProps) {
  const { children } = props

  return (
    <header
      className={cn(
        `sticky top-0 flex h-18 items-center justify-between bg-white transition-shadow z-100`,
        true && 'border-b'
      )}
    >
      <div className="container-xl flex items-center justify-between px-8">
        <div />
        <div className="flex gap-3">{children}</div>
      </div>
    </header>
  )
}
