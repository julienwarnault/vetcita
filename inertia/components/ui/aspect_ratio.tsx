import { ComponentProps } from 'react'
import { cn } from 'tailwind-variants'

interface AspectRatioProps extends ComponentProps<'div'> {
  ratio?: number | string
}

export function AspectRatio(props: AspectRatioProps) {
  const { ratio = 16 / 9, className, style, ...rest } = props

  return <div className={cn('relative w-full', className)} style={{ aspectRatio: ratio, ...style }} {...rest} />
}
