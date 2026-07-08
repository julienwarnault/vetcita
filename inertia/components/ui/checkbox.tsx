import { cn } from 'tailwind-variants'
import { CheckIcon } from 'lucide-react'
import { Checkbox as BaseCheckbox } from '@base-ui/react/checkbox'

export function Checkbox({ className, ...props }: BaseCheckbox.Root.Props) {
  return (
    <BaseCheckbox.Root
      className={cn(
        'size-6 rounded-sm border hover:bg-background hover:border-border-strong data-checked:bg-accent data-checked:text-white data-checked:border-accent data-checked:hover:bg-accent/90 data-checked:hover:border-border-accent/90 cursor-pointer',
        className
      )}
      {...props}
    >
      <BaseCheckbox.Indicator className="flex items-center justify-center transition-none w-full h-full">
        <CheckIcon size={16} strokeWidth={3} />
      </BaseCheckbox.Indicator>
    </BaseCheckbox.Root>
  )
}
