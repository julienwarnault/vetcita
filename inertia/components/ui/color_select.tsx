import { cn } from 'tailwind-variants'
import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

export const COLORS = [
  '#97c6f0',
  '#a9b3fe',
  '#b8adff',
  '#c6abf7',
  '#e3a3fa',
  '#f6a2e4',
  '#ffa3ba',
  '#e85d6f',
  '#ffa175',
  '#febf69',
  '#fed367',
  '#ffec78',
  '#e7f286',
  '#c5e89c',
  '#a7e4bd',
  '#6cd5cb',
  '#91e8ee',
]

interface ColorSelectProps {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
}

export function ColorSelect(props: ColorSelectProps) {
  return (
    <RadioGroup {...props} className="flex flex-wrap gap-1 max-w-md">
      {COLORS.map((color) => (
        <Radio.Root
          key={color}
          value={color}
          className={cn(
            'flex items-center justify-center rounded-full size-10 cursor-pointer',
            'border-2 border-transparent transition-colors',
            'hover:border-border data-checked:border-accent',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2'
          )}
        >
          <span className="rounded-full size-8" style={{ backgroundColor: color }} />
        </Radio.Root>
      ))}
    </RadioGroup>
  )
}
