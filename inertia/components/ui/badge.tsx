import { CSSProperties, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const badge = tv({
  base: 'inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full',
  variants: {
    variant: {
      primary: 'bg-primary text-white',
      secondary: 'border border-border bg-white',
      accent: 'bg-accent text-white',
    },
    size: {
      md: 'px-3 min-block-6 text-[13px]/4 font-medium [&_svg]:size-3',
      lg: 'px-3 min-block-8 text-[14px]/4 font-medium [&_svg]:size-4',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
})

type BadgeVariants = VariantProps<typeof badge>

interface BadgeProps extends BadgeVariants {
  className?: string
  children: ReactNode
  color?: string
  style?: CSSProperties
}

export function Badge(props: BadgeProps) {
  const { size, variant, className, color, style, ...rest } = props

  return (
    <div
      className={badge({
        size,
        variant,
        className: color ? `${className ?? ''} text-white` : className,
      })}
      style={color ? { ...style, backgroundColor: color } : style}
      {...rest}
    />
  )
}
