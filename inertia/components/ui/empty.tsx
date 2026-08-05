import { ReactNode } from 'react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { cn, tv, VariantProps } from 'tailwind-variants'

const empty = tv({
  slots: {
    container: 'flex flex-col gap-4 justify-center items-center px-6 py-16',
    illustration: 'aspect-square h-18 [&_img]:inline-size-full',
    heading: 'text-[20px]/7 font-semibold text-center',
    description: 'text-muted text-[15px]/5 text-center',
  },
  variants: {
    border: {
      true: {
        container: 'border rounded-xl',
      },
    },
  },
  defaultVariants: {
    border: true,
  },
})

export type EmptyVariants = VariantProps<typeof empty>

interface EmptyProps {
  heading: string
  description?: ReactNode
  illustration?: 'documents' | 'calendar'
  icon?: IconName
  className?: string
  visible?: boolean
  primaryAction?: ReactNode
}

export function Empty(props: EmptyProps & EmptyVariants) {
  const {
    border,
    heading,
    description,
    icon,
    illustration = 'documents',
    className,
    visible = true,
    primaryAction,
  } = props

  const classes = empty({ border })

  if (!visible) return null

  return (
    <div className={cn(classes.container(), className)}>
      {!icon && illustration && (
        <picture className={classes.illustration()}>
          <img className="inline-size-full" src={`/illustrations/${illustration}_illustration.png`} alt={heading} />
        </picture>
      )}
      {icon && <DynamicIcon name={icon} size={56} strokeWidth={1.5} className="mb-6" />}
      <div className="flex flex-col gap-1 items-center">
        <div className={classes.heading()}>{heading}</div>
        <div className={classes.description()}>{description}</div>
      </div>
      {primaryAction}
    </div>
  )
}
