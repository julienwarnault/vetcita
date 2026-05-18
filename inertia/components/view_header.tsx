import { isValidElement, ReactNode } from 'react'
import { Badge } from './ui/badge'

interface ViewHeaderProps {
  title: string
  badge?: ReactNode
  children?: ReactNode
}

export function ViewHeader(props: ViewHeaderProps) {
  const { title, badge, children } = props

  return (
    <div className="flex pb-6">
      <div className="flex items-center flex-1 gap-2">
        <h1 className="text-[28px]/9 font-semibold">{title}</h1>
        {!!badge && <Badge variant="secondary">{badge}</Badge>}
      </div>
      {isValidElement(children) && <div className="flex gap-3 ml-4">{children}</div>}
    </div>
  )
}
