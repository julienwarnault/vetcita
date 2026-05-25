import { ReactNode } from 'react'
import { cn } from 'tailwind-variants'
import { useWindowScroll } from '@uidotdev/usehooks'

interface FormHeaderProps {
  title?: string
  leftElement?: ReactNode
  rightElement?: ReactNode
  className?: string
}

export function FormHeader(props: FormHeaderProps) {
  const { title, leftElement, rightElement, className } = props

  const [{ y }] = useWindowScroll()

  const isScrolled = y && y > 10

  return (
    <header
      className={cn(
        `sticky top-0 flex h-18 items-center justify-between bg-white transition-shadow z-100`,
        isScrolled && 'border-b shadow-xs',
        className
      )}
    >
      <div className="container-xl flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex gap-3">{leftElement}</div>
          <div className={cn('transition-opacity', isScrolled ? 'opacity-100' : 'opacity-0')}>
            <div className="text-[22px] font-semibold">{title}</div>
          </div>
        </div>
        <div className="flex gap-3">{rightElement}</div>
      </div>
    </header>
  )
}
