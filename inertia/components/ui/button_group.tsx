import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import type { VariantProps } from 'tailwind-variants'

const buttonGroup = tv({
  base: 'flex w-fit items-stretch [&>button:not(:first-of-type)]:-ml-px [&>button:not(:first-of-type)]:rounded-l-none [&>button:not(:last-of-type)]:rounded-r-none [&>button:hover]:z-2',
})

type ButtonVariants = VariantProps<typeof buttonGroup>

interface ButtonGroupProps extends ButtonVariants {
  children: ReactNode
  className?: string
}

export function ButtonGroup({ className, children }: ButtonGroupProps) {
  return <div className={buttonGroup({ className })}>{children}</div>
}
