import { tv } from 'tailwind-variants'
import type { ComponentProps } from 'react'
import type { VariantProps } from 'tailwind-variants'
import { Button as BaseButton } from '@base-ui/react/button'

const button = tv({
  base: 'group inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full transition-colors disabled:pointer-events-none disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-primary text-white hover:bg-primary/90',
      secondary: 'border border-border bg-white hover:border-input',
    },
    size: {
      sm: 'h-9 px-4 text-[15px] font-medium',
      lg: 'h-12 px-5 text-[17px] font-semibold',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

export type ButtonVariants = VariantProps<typeof button>

interface ButtonProps extends ButtonVariants {
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
  onClick?: ComponentProps<'button'>['onClick']
}

export function Button(props: BaseButton.Props & ButtonProps) {
  const { children, variant, size, type = 'button', disabled, className, onClick, ...rest } = props

  return (
    <BaseButton
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={button({ variant, size, className })}
      {...rest}
    >
      {children}
    </BaseButton>
  )
}
