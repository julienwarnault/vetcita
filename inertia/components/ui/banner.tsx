import { ReactNode } from 'react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'

interface BannerProps {
  icon: IconName
  children: ReactNode
}

export function Banner(props: BannerProps) {
  const { icon, children } = props

  return (
    <div className="inline-flex gap-2 border bg-background w-full rounded-xl py-4 pl-3 pr-5">
      <DynamicIcon name={icon} size={23} />
      <div className="text-[15px]/5">{children}</div>
    </div>
  )
}
