import { cn } from 'tailwind-variants'
import { Radio } from '@base-ui/react/radio'
import { RadioGroup } from '@base-ui/react/radio-group'

export const COLORS_LIGHT = [
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

export const COLORS_DARK = [
  '#56bcf3',
  '#3b75e3',
  '#2c64f7',
  '#445df3',
  '#624df0',
  '#8146f6',
  '#a839da',
  '#be3ba4',
  '#c82e5b',
  '#c12740',
  '#e8773b',
  '#e0ac4e',
  '#ffc549',
  '#f7dd5a',
  '#e4f25c',
  '#4aa918',
  '#5ecdbb',
  '#66cbd7',
]

interface ColorSelectProps {
  name?: string
  value?: string
  defaultValue?: string
  onValueChange?(value: string): void
  mode?: 'light' | 'dark'
}

export function ColorSelect(props: ColorSelectProps) {
  const { mode = 'light', ...rest } = props

  const colors = mode === 'dark' ? COLORS_DARK : COLORS_LIGHT

  return (
    <RadioGroup {...rest} className="flex flex-wrap gap-1 max-w-lg">
      {colors.map((color) => (
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
