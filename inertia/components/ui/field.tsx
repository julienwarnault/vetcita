import { cn, tv } from 'tailwind-variants'
import { Field as FieldPrimitive } from '@base-ui/react/field'

const field = tv({
  slots: {
    root: 'flex flex-col col-span-3 gap-1',
    label: 'text-[15px] font-medium text-foreground',
    item: '',
    description: 'text-[13px] text-muted',
    error: 'text-sm text-destructive',
  },
})

export function Field({ className, ...props }: FieldPrimitive.Root.Props) {
  return <FieldPrimitive.Root className={cn(field().root(), className)} {...props} />
}

export function FieldLabel({ className, ...props }: FieldPrimitive.Label.Props) {
  return <FieldPrimitive.Label className={cn(field().label(), className)} {...props} />
}

export function FieldItem({ className, ...props }: FieldPrimitive.Item.Props) {
  return <FieldPrimitive.Item className={cn(field().item(), className)} {...props} />
}

export function FieldDescription({ className, ...props }: FieldPrimitive.Description.Props) {
  return <FieldPrimitive.Description className={cn(field().description(), className)} {...props} />
}

export function FieldError({ className, ...props }: FieldPrimitive.Error.Props) {
  return <FieldPrimitive.Error className={cn(field().error(), className)} {...props} />
}

Field.Label = FieldLabel
Field.Item = FieldItem
Field.Description = FieldDescription
Field.Error = FieldError
