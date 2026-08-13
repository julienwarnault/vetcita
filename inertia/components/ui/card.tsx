import { ComponentProps } from 'react'
import { cn, tv, VariantProps } from 'tailwind-variants'

const card = tv({
  base: 'overflow-y-auto rounded-xl border bg-surface',
  variants: {
    size: {
      md: 'px-5 py-2',
      lg: 'p-6',
      xl: 'p-10',
      none: 'p-0',
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

function CardHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col px-6 py-4 border-b', className)} {...props} />
}

function CardTitle({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('text-[20px]/7 font-semibold', className)} {...props} />
}

function CardDescription({ className, ...props }: ComponentProps<'p'>) {
  return <p className={cn('text-[15px]/5', className)} {...props} />
}

function CardBody({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('px-6 py-4', className)} {...props} />
}

Card.Header = CardHeader
Card.Title = CardTitle
Card.Description = CardDescription
Card.Body = CardBody
