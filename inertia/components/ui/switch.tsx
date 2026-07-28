import { cn } from 'tailwind-variants'
import { Switch as BaseSwitch } from '@base-ui/react/switch'

export function Switch({ className, ...props }: BaseSwitch.Root.Props) {
  return (
    <BaseSwitch.Root
      className={cn(
        'relative inline-flex h-6 w-12 cursor-pointer items-center rounded-full bg-border transition-colors data-checked:bg-accent disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:outline-2 focus-visible:-outline-offset-1 focus-visible:outline-accent',
        className
      )}
      {...props}
    >
      <BaseSwitch.Thumb className="block size-4.5 translate-x-1 rounded-full bg-white transition-transform data-checked:translate-x-6.5" />
    </BaseSwitch.Root>
  )
}
