import { cn, tv, VariantProps } from 'tailwind-variants'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { Skeleton } from './skeleton'

const avatar = tv({
  base: 'inline-flex shrink-0 select-none items-center justify-center overflow-hidden rounded-full bg-accent align-middle font-semibold text-white',
  variants: {
    size: {
      'md': 'size-12 text-base',
      'lg': 'size-[54px] text-lg',
      'xl': 'size-[64px] text-xl',
      '4xl': 'size-24 text-3xl',
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
  icon?: IconName
  isLoading?: boolean
}

export function Avatar(props: BaseAvatar.Root.Props & AvatarProps) {
  const {
    size,
    color,
    fullName,
    icon = 'person-standing',
    className,
    style,
    isLoading = false,
    children,
    ...rest
  } = props

  if (isLoading) {
    return <Skeleton className={cn(avatar({ size, className }))} />
  }

  return (
    <BaseAvatar.Root
      className={avatar({ size, className })}
      style={color ? { backgroundColor: color, ...style } : style}
      {...rest}
    >
      {!children ? fullName?.charAt(0).toUpperCase() || <DynamicIcon name={icon} /> : children}
    </BaseAvatar.Root>
  )
}
