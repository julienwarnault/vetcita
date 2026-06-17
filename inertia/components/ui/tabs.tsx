import { cn, tv } from 'tailwind-variants'
import { Tabs as TabsPrimitive } from '@base-ui/react/tabs'

const tabs = tv({
  slots: {
    root: '',
    list: [
      'flex',
      'data-[orientation=horizontal]:flex-row',
      'data-[orientation=vertical]:w-full data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch',
    ],
    trigger: [
      'flex items-center justify-between px-4 py-3 -mx-4 whitespace-nowrap truncate',
      'text-[15px]/5 font-medium',
      'rounded-xl hover:bg-background data-active:bg-accent-faded transition-colors',
    ],
  },
})

export function Tabs({
  className,
  orientation = 'horizontal',
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(tabs().root(), className)}
      orientation={orientation}
      {...props}
    />
  )
}

function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      render={<ul />}
      className={cn(tabs().list(), className)}
      {...props}
    />
  )
}

function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return <TabsPrimitive.Tab className={cn(tabs().trigger(), className)} {...props} />
}

function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return <TabsPrimitive.Panel data-slot="tabs-content" className={className} {...props} />
}

Tabs.List = TabsList
Tabs.Trigger = TabsTrigger
Tabs.Content = TabsContent
