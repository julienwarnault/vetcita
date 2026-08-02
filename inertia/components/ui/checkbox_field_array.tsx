import { ReactNode } from 'react'
import { tv } from 'tailwind-variants'
import { CheckIcon } from 'lucide-react'
import { Checkbox, CheckboxGroup } from '@base-ui/react'
import { Field } from './field'
import { Badge } from './badge'

const checkboxFieldArray = tv({
  slots: {
    container: 'flex flex-col gap-4',
    item: 'flex flex-1 items-center gap-3 px-4 py-5 -mx-4 rounded-xl transition-colors cursor-pointer hover:bg-background',
    checkbox:
      'flex items-center justify-center size-6 border rounded-sm bg-white data-checked:bg-accent data-checked:text-white data-checked:border-accent data-indeterminate:bg-accent data-indeterminate:text-white data-indeterminate:border-accent',
    badge:
      'inline-flex items-center justify-center min-w-6 h-6 px-2 rounded-full bg-background text-[13px]/4 font-medium text-muted',
  },
})

interface CheckboxFieldArrayProps<T> {
  name: string
  items: T[]
  value?: string[]
  defaultValue?: string[]
  onChange?: (value: string[]) => void
  className?: string
  disabled?: boolean
  selectAllLabel?: ReactNode
  getValue: (item: T) => string
  renderItem: (item: T) => ReactNode
}

export function CheckboxFieldArray<T>(props: CheckboxFieldArrayProps<T>) {
  const {
    name,
    items,
    className,
    disabled,
    selectAllLabel = 'Seleccionar todo',
    getValue,
    renderItem,
    value,
    defaultValue,
    onChange,
  } = props

  const classes = checkboxFieldArray()
  const values = items.map(getValue)

  return (
    <Field name={name} className={className}>
      <CheckboxGroup
        allValues={values}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onChange}
        disabled={disabled}
        className={classes.container()}
      >
        {items.length > 0 && (
          <Field.Item>
            <Field.Label className={classes.item()}>
              <Checkbox.Root parent className={classes.checkbox()}>
                <Checkbox.Indicator className="flex data-unchecked:hidden data-indeterminate:hidden">
                  <CheckIcon size={16} strokeWidth={3} />
                </Checkbox.Indicator>
                <Checkbox.Indicator className="hidden data-indeterminate:flex">
                  <span className="h-0.5 w-3 rounded-full bg-current" />
                </Checkbox.Indicator>
              </Checkbox.Root>
              <span className="text-[17px]/6 font-semibold">{selectAllLabel}</span>
              <Badge variant="secondary">{items.length}</Badge>
            </Field.Label>
          </Field.Item>
        )}

        <div>
          {items.map((item) => {
            const value = getValue(item)
            return (
              <Field.Item key={value}>
                <Field.Label className={classes.item()}>
                  <Checkbox.Root value={value} className={classes.checkbox()}>
                    <Checkbox.Indicator className="flex data-unchecked:hidden">
                      <CheckIcon size={16} strokeWidth={3} />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  {renderItem(item)}
                </Field.Label>
              </Field.Item>
            )
          })}
        </div>
      </CheckboxGroup>
      <Field.Error />
    </Field>
  )
}
