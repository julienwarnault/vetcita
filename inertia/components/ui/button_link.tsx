import type { ComponentProps } from 'react'
import { Link } from '@adonisjs/inertia/react'
import { Button } from './button'

type LinkProps = ComponentProps<typeof Link>
type ButtonProps = ComponentProps<typeof Button>

export function ButtonLink(props: ButtonProps & Omit<LinkProps, 'size'>) {
  const { variant, size, rounded, ...rest } = props

  return (
    <Button
      variant={variant}
      size={size}
      rounded={rounded}
      render={<Link {...(rest as LinkProps)} />}
      nativeButton={false}
    />
  )
}
