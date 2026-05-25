import { cn } from 'tailwind-variants'
import { isValidElement, ReactNode } from 'react'
import { Badge } from './ui/badge'

interface ViewHeaderProps {
  title: string
  subtitle?: string
  badge?: ReactNode
  className?: string
  children?: ReactNode
}

export function ViewHeader(props: ViewHeaderProps) {
  const { title, subtitle, badge, className, children } = props

  return (
    <div className={cn('flex pb-6', className)}>
      <div className="flex flex-col flex-1 gap-1">
        <div className="flex items-center flex-1 gap-2">
          <h1 className="text-[28px]/9 font-semibold">{title}</h1>
          {!!badge && <Badge variant="secondary">{badge}</Badge>}
        </div>
        {subtitle && <div className="text-muted text-[15px]/5">{subtitle}</div>}
      </div>
      {isValidElement(children) && <div className="flex gap-3 ml-4">{children}</div>}
    </div>
  )
}
