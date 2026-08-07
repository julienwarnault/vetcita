import { useState } from 'react'
import { cn } from 'tailwind-variants'
import { Input } from '@base-ui/react'
import { DynamicIcon, type IconName } from 'lucide-react/dynamic'
import { baseInput } from './input'
import { Popover } from './popover'

export const ICONS = [
  'calendar',
  'calendar-plus-2',
  'calendar-clock',
  'calendar-check',
  'calendar-x',
  'check',
  'clock',
  'circle-check',
  'circle-x',
  'eye-off',
  'door-open',
  'hourglass',
  'message-circle',
  'phone',
  'sofa',
  'triangle-alert',
  'user-check',
  'user-x',
] satisfies IconName[]

interface InputIconProps extends Omit<React.ComponentProps<'input'>, 'type' | 'value' | 'defaultValue' | 'onChange'> {
  value?: IconName | ''
  defaultValue?: IconName | ''
  icons?: readonly IconName[]
  disabled?: boolean
  onValueChange?: (value: IconName) => void
}

export function InputIcon(props: InputIconProps) {
  const { value, defaultValue, icons = ICONS, disabled, onValueChange, className, ...inputProps } = props

  const [isOpen, setIsOpen] = useState(false)
  const [internalValue, setInternalValue] = useState<IconName | ''>(defaultValue ?? '')
  const selectedValue = value ?? internalValue

  function handleSelect(icon: IconName) {
    if (value === undefined) {
      setInternalValue(icon)
    }

    onValueChange?.(icon)
    setIsOpen(false)
  }

  return (
    <>
      <Input {...inputProps} type="hidden" value={selectedValue} disabled={disabled} />
      <Popover
        open={isOpen}
        onOpenChange={setIsOpen}
        align="start"
        trigger={
          <button
            type="button"
            disabled={disabled}
            className={cn(baseInput(), 'inline-flex items-center justify-center px-4', className)}
          >
            {selectedValue && <DynamicIcon name={selectedValue} className="size-5 shrink-0" />}
          </button>
        }
      >
        <div className="grid grid-cols-6 gap-1">
          {icons.map((icon) => {
            const isSelected = icon === selectedValue

            return (
              <button
                key={icon}
                type="button"
                title={icon}
                aria-label={icon}
                aria-pressed={isSelected}
                onClick={() => handleSelect(icon)}
                className={cn(
                  'flex size-10 items-center justify-center rounded-lg hover:bg-background',
                  'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-accent',
                  isSelected && 'bg-accent-faded text-accent'
                )}
              >
                <DynamicIcon name={icon} className="size-5" />
              </button>
            )
          })}
        </div>
      </Popover>
    </>
  )
}
