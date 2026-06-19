import { isValidElement, ReactNode } from 'react'
import { tv, VariantProps } from 'tailwind-variants'
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip'

const tooltip = tv({
  slots: {
    positioner: 'z-50',
    popup: 'rounded-lg shadow-xl font-medium',
    arrow:
      'z-50 size-2.5 rotate-45 translate-y-[calc(-50%-2px)] rounded-[2px] fill-foreground data-[side=top]:-bottom-2.5 data-[side=bottom]:top-1 data-[side=left]:-right-1 data-[side=left]:top-1/2! data-[side=left]:-translate-y-1/2 data-[side=right]:-left-1 data-[side=right]:top-1/2! data-[side=right]:-translate-y-1/2 data-[side=inline-start]:-right-1 data-[side=inline-start]:top-1/2! data-[side=inline-start]:-translate-y-1/2 data-[side=inline-end]:-left-1 data-[side=inline-end]:top-1/2! data-[side=inline-end]:-translate-y-1/2',
  },
  variants: {
    variant: {
      primary: {
        popup: 'bg-primary text-white',
        arrow: 'bg-primary',
      },
    },
    size: {
      sm: {
        popup: 'px-2 py-1.5 text-[13px]',
      },
      md: {
        popup: 'px-3 py-2 text-sm',
      },
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'sm',
  },
})

type TooltipVariants = VariantProps<typeof tooltip>

interface TooltipProps extends TooltipVariants {
  trigger: ReactNode
  placement?: 'top' | 'right' | 'bottom' | 'left'
  children: ReactNode
  hideArrow?: boolean
  sideOffset?: BaseTooltip.Positioner.Props['sideOffset']
}

export function Tooltip(props: TooltipProps) {
  const { trigger, variant, size, sideOffset = 8, placement = 'bottom', hideArrow = true, children } = props

  const classes = tooltip({ variant, size })

  return (
    <BaseTooltip.Provider delay={0}>
      <BaseTooltip.Root>
        {isValidElement(trigger) && <BaseTooltip.Trigger render={trigger} />}

        <BaseTooltip.Portal>
          <BaseTooltip.Positioner side={placement} sideOffset={sideOffset} className={classes.positioner()}>
            <BaseTooltip.Popup className={classes.popup()}>
              {!hideArrow && <BaseTooltip.Arrow className={classes.arrow()} />}
              {children}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </BaseTooltip.Provider>
  )
}
