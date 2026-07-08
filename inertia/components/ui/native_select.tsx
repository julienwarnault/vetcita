import { cn } from 'tailwind-variants'
import { ComponentProps } from 'react'
import { Field } from '@base-ui/react'
import { ChevronDownIcon } from 'lucide-react'
import { baseInput } from './input'

interface NativeSelectProps extends Omit<React.ComponentProps<'select'>, 'size'> {}

export function NativeSelect(props: NativeSelectProps) {
  const { className, ...rest } = props

  return (
    <div className="group relative">
      <Field.Control
        render={<select {...rest} />}
        className={cn(baseInput(), 'appearance-none pr-10 cursor-pointer', className)}
      />
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 select-none"
        aria-hidden="true"
      />
    </div>
  )
}

export function NativeOption(props: ComponentProps<'option'>) {
  const { className, ...rest } = props

  return <option className={cn(className)} {...rest} />
}

NativeSelect.Option = NativeOption
