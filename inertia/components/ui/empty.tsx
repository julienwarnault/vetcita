import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { ReactNode } from 'react'
import { cn, tv, VariantProps } from 'tailwind-variants'

const empty = tv({
  slots: {
    container: 'flex flex-col items-center px-6 py-16',
    illustration: 'aspect-square h-14 [&_img]:inline-size-full',
    heading: 'text-[20px]/7 font-semibold',
    description: 'text-muted text-[15px]/5',
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
  illustration?: string
  icon?: IconName
  className?: string
}

export function Empty(props: EmptyProps & EmptyVariants) {
  const { border, heading, description, icon, illustration, className } = props

  const classes = empty({ border })

  return (
    <div className={cn(classes.container(), className)}>
      {illustration && (
        <picture className={classes.illustration()}>
          <img className="inline-size-full" src={illustration} alt={heading} />
        </picture>
      )}
      {icon && <DynamicIcon name={icon} size={56} strokeWidth={1.5} className="mb-6" />}
      <div className="flex flex-col gap-1 items-center">
        <div className={classes.heading()}>{heading}</div>
        <div className={classes.description()}>{description}</div>
      </div>
    </div>
  )
}
