import { Input } from '@base-ui/react'
import { cn, tv, VariantProps } from 'tailwind-variants'
import { ComponentProps, createContext, useContext } from 'react'

const inputGroup = tv({
  slots: {
    group:
      'group/input-group flex w-full min-w-0 items-center rounded-lg border border-input bg-white hover:border-border-strong has-disabled:opacity-50 has-[[data-slot=input-group-control]:focus-visible]:outline-2 has-[[data-slot=input-group-control]:focus-visible]:-outline-offset-1 has-[[data-slot=input-group-control]:focus-visible]:outline-accent has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:outline-destructive',
    addon: 'flex items-center justify-center cursor-text select-none text-muted',
    input: 'flex-1 rounded-none border-0 bg-transparent outline-none not-focus:text-ellipsis',
  },
  variants: {
    inputSize: {
      md: {
        group: 'h-12 text-[15px]/5 [&_svg]:size-5',
        input: 'px-4 py-2',
      },
      sm: {
        group: 'h-9',
        input: 'px-3 py-1',
      },
    },
    align: {
      start: { addon: 'order-first' },
      end: { addon: 'order-last' },
    },
  },
  compoundVariants: [
    { inputSize: 'md', align: 'start', class: { addon: 'pl-4' } },
    { inputSize: 'md', align: 'end', class: { addon: 'pr-4' } },
    { inputSize: 'sm', align: 'start', class: { addon: 'pl-3' } },
    { inputSize: 'sm', align: 'end', class: { addon: 'pr-3' } },
  ],
  defaultVariants: {
    inputSize: 'md',
    align: 'start',
  },
})

type InputSize = NonNullable<VariantProps<typeof inputGroup>['inputSize']>
type Align = NonNullable<VariantProps<typeof inputGroup>['align']>

const InputGroupContext = createContext<{ inputSize: InputSize } | null>(null)

export function InputGroup({
  className,
  inputSize = 'md',
  ...props
}: ComponentProps<'div'> & { inputSize?: InputSize }) {
  const { group } = inputGroup({ inputSize })

  return (
    <InputGroupContext.Provider value={{ inputSize }}>
      <div role="group" className={cn(group({ inputSize }), className)} {...props} />
    </InputGroupContext.Provider>
  )
}

function InputGroupAddon({ className, align = 'start', ...props }: React.ComponentProps<'div'> & { align?: Align }) {
  const { inputSize } = useInputGroup()
  const { addon } = inputGroup({ inputSize, align })
  return <div data-align={align} className={cn(addon(), className)} {...props} />
}

function InputGroupInput({ className, ...props }: React.ComponentProps<'input'>) {
  const { inputSize } = useInputGroup()
  const { input } = inputGroup({ inputSize })
  return <Input data-slot="input-group-control" className={cn(input({ inputSize }), className)} {...props} />
}

function useInputGroup() {
  const ctx = useContext(InputGroupContext)
  if (!ctx) {
    throw new Error()
  }
  return ctx
}

InputGroup.Addon = InputGroupAddon
InputGroup.Input = InputGroupInput
