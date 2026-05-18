import { tv, VariantProps } from 'tailwind-variants'
import { Input as InputPrimitive } from '@base-ui/react/input'

export const baseInput = tv({
  base: 'w-full rounded-lg border px-4 py-2 text-base text-gray-900 bg-white data-placeholder:text-muted hover:border-border-strong focus:outline-2 focus:-outline-offset-1 focus:outline-accent focus-visible:aria-invalid:outline-danger aria-invalid:border-danger font-normal',
  variants: {
    inputSize: {
      md: 'h-12 text-[15px]/5',
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
})

type InputVariants = VariantProps<typeof baseInput>

interface InputProps extends InputVariants {
  className?: string
}

export function Input({ className, ...props }: InputPrimitive.Props & InputProps) {
  return <InputPrimitive className={baseInput({ className })} {...props} />
}
