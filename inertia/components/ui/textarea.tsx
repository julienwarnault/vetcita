import { tv, VariantProps } from 'tailwind-variants'
import { Field as BaseField } from '@base-ui/react/field'

const textarea = tv({
  base: 'w-full min-h-[7.5rem] resize-none rounded-lg border p-4 text-base font-normal text-gray-900 bg-white field-sizing-content hover:border-border-strong focus:outline-2 focus:-outline-offset-1 focus:outline-accent aria-invalid:border-destructive focus-visible:aria-invalid:outline-destructive',
  variants: {
    inputSize: {
      md: 'text-[15px]/5',
    },
  },
  defaultVariants: {
    inputSize: 'md',
  },
})

type TextareaVariants = VariantProps<typeof textarea>

export function Textarea({ className, ...props }: React.ComponentProps<'textarea'> & TextareaVariants) {
  return <BaseField.Control render={<textarea className={textarea({ className })} {...props} />} />
}
