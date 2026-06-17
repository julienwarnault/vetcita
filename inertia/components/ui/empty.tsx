import { cn, tv, VariantProps } from 'tailwind-variants'

const empty = tv({
  slots: {
    container: 'flex flex-col items-center px-6 py-16',
    illustration: 'aspect-square h-14 [&_img]:inline-size-full',
    heading: 'text-[20px]/7 font-semibold',
    description: 'text-muted text-[15px]/5',
  },
  variants: {
    border: {
      true: {
        container: 'border rounded-xl',
      },
    },
  },
  defaultVariants: {
    border: true,
  },
})

export type EmptyVariants = VariantProps<typeof empty>

interface EmptyProps {
  heading: string
  description: string
  illustration?: string
  className?: string
}

export function Empty(props: EmptyProps & EmptyVariants) {
  const { border, heading, description, illustration, className } = props

  const classes = empty({ border })

  return (
    <div className={cn(classes.container(), className)}>
      {illustration && (
        <picture className={classes.illustration()}>
          <img className="inline-size-full" src={illustration} alt={heading} />
        </picture>
      )}
      <div className="flex flex-col items-center">
        <div className={classes.heading()}>{heading}</div>
        <div className={classes.description()}>{description}</div>
      </div>
    </div>
  )
}
