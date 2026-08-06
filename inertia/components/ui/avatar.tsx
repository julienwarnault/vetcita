import { cn, tv, VariantProps } from 'tailwind-variants'
import { Avatar as BaseAvatar } from '@base-ui/react/avatar'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { Skeleton } from './skeleton'

const avatar = tv({
  base: 'inline-flex select-none items-center justify-center overflow-hidden rounded-full font-semibold text-white',
  variants: {
    size: {
      'xs': 'size-7 text-[13px]',
      'sm': 'size-10 text-[13px]',
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
  src?: string
  isLoading?: boolean
}

export function Avatar(props: BaseAvatar.Root.Props & AvatarProps) {
  const {
    size,
    color,
    fullName,
    icon = 'person-standing',
    src,
    className,
    style,
    isLoading = false,
    children,
    ...rest
  } = props

  if (isLoading) {
    return <Skeleton className={cn(avatar({ size, className }))} />
  }

  function renderContent() {
    if (children) return children
    if (fullName) return fullName.charAt(0).toUpperCase()
    if (src) return <BaseAvatar.Image src={src} className="size-full object-cover" />
    return <DynamicIcon name={icon} />
  }

  return (
    <BaseAvatar.Root
      className={avatar({ size, className })}
      style={!src ? { backgroundColor: color || 'var(--color-accent)', ...style } : style}
      {...rest}
    >
      {renderContent()}{' '}
    </BaseAvatar.Root>
  )
}
