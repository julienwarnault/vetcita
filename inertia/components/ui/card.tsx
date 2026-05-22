import { ComponentProps } from 'react'
import { tv, VariantProps } from 'tailwind-variants'

const card = tv({
  base: 'overflow-y-auto overscroll-none rounded-xl border bg-surface',
  variants: {
    size: {
      md: 'px-5 py-2',
      lg: 'p-6',
      xl: 'p-10',
    },
    shadow: {
      true: 'shadow-xl',
    },
  },
  defaultVariants: {
    shadow: false,
    size: 'md',
  },
})

export type CardVariants = VariantProps<typeof card>

interface CardProps extends CardVariants {}

export function Card(props: ComponentProps<'div'> & CardProps) {
  const { size, shadow, className, ...rest } = props

  return <div className={card({ size, shadow, className })} {...rest} />
}
