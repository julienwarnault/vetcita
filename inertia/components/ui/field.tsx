import { cn, tv } from 'tailwind-variants'
import { Field as FieldPrimitive } from '@base-ui/react/field'

const field = tv({
  slots: {
    root: 'flex flex-col col-span-3 gap-1',
    label: 'text-[15px] font-medium text-foreground',
    description: 'text-sm text-muted',
    error: 'text-sm text-destructive',
  },
})

export function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return <FieldPrimitive.Root className={cn(field().root(), className)} {...props} />
}

export function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return <FieldPrimitive.Label className={cn(field().label(), className)} {...props} />
}

export function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return <FieldPrimitive.Description className={cn(field().description(), className)} {...props} />
}

export function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return <FieldPrimitive.Error className={cn(field().error(), className)} {...props} />
}

Field.Label = FieldLabel
Field.Description = FieldDescription
Field.Error = FieldError
