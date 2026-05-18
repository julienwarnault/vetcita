import { ComponentProps } from 'react'
import { cn } from 'tailwind-variants'

interface CardProps {}

export function Card(props: ComponentProps<'div'> & CardProps) {
  const { className, ...rest } = props

  return (
    <div
      className={cn(
        'overflow-y-auto overscroll-none rounded-xl border bg-surface px-5 py-2 shadow-xl',
        className
      )}
      {...rest}
    />
  )
}
