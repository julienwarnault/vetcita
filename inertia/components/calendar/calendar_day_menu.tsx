import { DateTime } from 'luxon'
import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import { Menu as BaseMenu } from '@base-ui/react'
import { isValidElement, ReactNode, useState } from 'react'
import { AlignVerticalSpaceAroundIcon, XIcon } from 'lucide-react'
import usePageProps from '~/hooks/use_page_props'
import { type ViewType } from '~/lib/calendar'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Button } from '../ui/button'
import { urlFor } from '~/lib/tuyau'
import { Card } from '../ui/card'
import { Menu } from '../ui/menu'

interface CalendarDayMenuProps {
  day: DateTime
  children: ReactNode
}

export function CalendarDayMenu(props: CalendarDayMenuProps) {
  const { day, children } = props

  const { qs } = usePageProps()

  const [isOpen, setIsOpen] = useState(false)

  function onChangeView() {
    qs.view = 'day' as ViewType
    qs.date = day.toFormat('yyyy-MM-dd')
    router.get(urlFor('show_calendar.render', {}, { qs }), {}, { preserveState: true })
  }

  return (
    <BaseMenu.Root open={isOpen} onOpenChange={setIsOpen}>
      {isValidElement(children) && <BaseMenu.Trigger delay={300} render={children} nativeButton={false} />}

      <BaseMenu.Portal>
        <BaseMenu.Positioner
          sideOffset={10}
          side="left"
          positionMethod="fixed"
          className="z-50"
          collisionAvoidance={{
            side: 'flip',
            align: 'flip',
            fallbackAxisSide: 'start',
          }}
        >
          <BaseMenu.Popup
            render={<Card shadow={true} size="none" />}
            className={cn(
              'overflow-hidden w-70',
              'transition-opacity duration-200 ease-out',
              'data-starting-style:opacity-0 data-closed:opacity-0 data-open:opacity-100'
            )}
          >
            <div className="flex flex-col">
              <div className="flex items-center justify-between py-2 pl-6 pr-3 bg-border/60">
                <div className="text-[17px]/6 font-semibold">
                  {day.setLocale(DEFAULT_LOCALE).toFormat('cccc, d LLL')}
                </div>
                <Button size="icon-sm" variant="tertiary" className="-m-2" onClick={() => setIsOpen(false)}>
                  <XIcon />
                </Button>
              </div>
              <div className="px-6 py-4">
                <Menu.Item onClick={onChangeView}>
                  <AlignVerticalSpaceAroundIcon />
                  Vista de día
                </Menu.Item>
              </div>
            </div>
          </BaseMenu.Popup>
        </BaseMenu.Positioner>
      </BaseMenu.Portal>
    </BaseMenu.Root>
  )
}
