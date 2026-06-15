import * as React from 'react'
import { cn } from 'tailwind-variants'
import { ChevronRightIcon } from 'lucide-react'
import { useRender } from '@base-ui/react/use-render'
import { mergeProps } from '@base-ui/react/merge-props'

export function Breadcrumb({ className, ...props }: React.ComponentProps<'nav'>) {
  return <nav className={cn(className)} {...props} />
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<'ol'>) {
  return (
    <ol
      className={cn(
        'flex flex-wrap items-center gap-1.5 text-[15px]/5 font-medium wrap-break-word text-muted',
        className
      )}
      {...props}
    />
  )
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<'li'>) {
  return <li className={cn('inline-flex items-center gap-1', className)} {...props} />
}

function BreadcrumbLink({ className, render, ...props }: useRender.ComponentProps<'a'>) {
  return useRender({
    defaultTagName: 'a',
    props: mergeProps<'a'>(
      {
        className: cn('transition-colors hover:text-foreground', className),
      },
      props
    ),
    render,
  })
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<'span'>) {
  return <span role="link" className={cn('text-foreground', className)} {...props} />
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<'li'>) {
  return (
    <li role="presentation" className={cn('[&>svg]:size-3.5', className)} {...props}>
      {children ?? <ChevronRightIcon strokeWidth={2.6} />}
    </li>
  )
}

Breadcrumb.List = BreadcrumbList
Breadcrumb.Item = BreadcrumbItem
Breadcrumb.Link = BreadcrumbLink
Breadcrumb.Page = BreadcrumbPage
Breadcrumb.Separator = BreadcrumbSeparator
