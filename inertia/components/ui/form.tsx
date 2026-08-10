import { cn } from 'tailwind-variants'
import { routes } from '@generated/registry'
import { Form as FormPrimitive } from '@base-ui/react/form'
import { FormProps, Form as InertiaForm } from '@adonisjs/inertia/react'

export function Form<Route extends keyof typeof routes>(props: FormProps<Route>) {
  const { className, children, ...inertiaProps } = props

  return (
    <InertiaForm {...(inertiaProps as any)}>
      {(slotProps) => (
        <FormPrimitive
          errors={slotProps.errors}
          render={<div />}
          className={cn('flex w-full flex-col gap-4', className)}
        >
          {typeof children === 'function' ? (children as any)(slotProps) : children}
        </FormPrimitive>
      )}
    </InertiaForm>
  )
}
