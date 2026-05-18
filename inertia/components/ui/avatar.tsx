import { tv, VariantProps } from 'tailwind-variants'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'

const avatar = tv({
  base: 'inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-accent align-middle font-semibold text-white',
  variants: {
    size: {
      md: 'size-12 text-base',
      lg: 'size-[54px] text-lg',
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

type AvatarVariants = VariantProps<typeof avatar>

interface AvatarProps extends AvatarVariants {
  fullName?: string
  color?: string
  className?: string
}

export function Avatar(props: BaseAvatar.Root.Props & AvatarProps) {
  const { size, color, fullName, className, style, children, ...rest } = props
  return (
    <BaseAvatar.Root
      className={avatar({ size, className })}
      style={color ? { backgroundColor: color, ...style } : style}
      {...rest}
    >
      {!children ? fullName?.charAt(0).toUpperCase() : children}
    </BaseAvatar.Root>
  )
}
