import { useRef } from 'react'
import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { cn } from 'tailwind-variants'
import { router } from '@inertiajs/react'
import { useQuery } from '@tanstack/react-query'
import { PopoverRootActions } from '@base-ui/react'
import { CircleAlertIcon, TrashIcon } from 'lucide-react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE, generateTimeSlots } from '~/lib/date'
import { AppointmentForm } from './use_appointment_form'
import { capitalize, formatPrice } from '~/lib/utils'
import { DatePicker } from '../ui/date_picker'
import { query, urlFor } from '~/lib/tuyau'
import { Popover } from '../ui/popover'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'
import { Avatar } from '../ui/avatar'
import { Select } from '../ui/select'
import { Badge } from '../ui/badge'

interface PanelReviewProps {
  form: AppointmentForm
  service?: Data.Services.Service
  agenda?: Data.Agendas.Agenda
  status?: Data.AppointmentWorkflow.AppointmentStatus
  statuses: Data.AppointmentWorkflow.AppointmentStatus[]
  agendas: Data.Agendas.Agenda[]
  canContinue: boolean
  goToStep(step: number): void
  next(): void
  close(): void
}

export function PanelReview(props: PanelReviewProps) {
  const { form, service, statuses, status, agenda, agendas, canContinue, next, goToStep, close } = props
  const { data, setData, isDirty } = form

  const pickerActionsRef = useRef<PopoverRootActions>(null)

  const date = DateTime.fromISO(data.startDate, { zone: DEFAULT_TIMEZONE }).startOf('day')
  const startDate = DateTime.fromISO(data.startDate, { zone: DEFAULT_TIMEZONE })
  const endDate = startDate.plus({ minutes: service?.duration || 0 })

  const { data: slots, isLoading: isLoadingSlots } = useQuery(
    query.getBookableSlots.render.queryOptions(
      {
        query: {
          tenantId: data.tenantId,
          serviceId: service!.id,
          date: date.toFormat('yyyy-MM-dd'),
          ...(data?.id && { appointmentId: data?.id }),
        },
      },
      { enabled: Boolean(date && service) }
    )
  )

  const availableSlots = slots?.slots ?? []
  const availableTimeValues = new Set(
    availableSlots.map((slot) => DateTime.fromISO(slot.at, { zone: DEFAULT_TIMEZONE }).toFormat('HH:mm:00'))
  )
  const currentSlot = availableSlots.find((slot) => DateTime.fromISO(slot.at).toMillis() === startDate.toMillis())
  const isSelectedAgendaAvailable = agenda ? !!currentSlot?.availableAgendaIds.includes(agenda.id) : true
  const selectedTimeValue = startDate.toFormat('HH:mm:00')

  const changeDay = (newDay: DateTime) => {
    const nextStartDate = startDate.set({
      year: newDay.year,
      month: newDay.month,
      day: newDay.day,
    })

    setData('startDate', nextStartDate.toISO()!)
  }

  const changeTime = (value: string) => {
    const [hour, minute, second] = value.split(':').map(Number)
    const nextStartDate = startDate.set({
      hour,
      minute,
      second,
      millisecond: 0,
    })

    setData('startDate', nextStartDate.toISO()!)
  }

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr_auto]">
      <Drawer.Header>
        <div
          className={cn('flex justify-between gap-4 p-8', data.id && 'text-white')}
          style={{ backgroundColor: data.id && status ? status.color : '#fff' }}
        >
          <div className="flex flex-col">
            <Popover
              actionsRef={pickerActionsRef}
              trigger={
                <button className="flex items-center gap-1">
                  <div className="text-[28px]/9 font-semibold">
                    {capitalize(startDate.setLocale(DEFAULT_LOCALE).toFormat('ccc. d LLL'))}
                  </div>
                  <Popover.TriggerIcon />
                </button>
              }
            >
              <DatePicker
                initialMonth={date.startOf('month')}
                selectedDays={date}
                numberOfMonths={1}
                onDayClick={(newDay) => {
                  changeDay(newDay)
                  pickerActionsRef.current?.close()
                }}
              />
            </Popover>
            <Select
              align="start"
              value={selectedTimeValue}
              onValueChange={(value) => {
                if (value) changeTime(value)
              }}
              trigger={
                <button className="flex items-center gap-1">
                  <div className="text-sm font-normal">{startDate.toFormat('h:mma').toLowerCase()}</div>
                  <Popover.TriggerIcon />
                </button>
              }
              items={generateTimeSlots(15).map(({ label, value }) => {
                const isUnavailable = !isLoadingSlots && !availableTimeValues.has(value)

                return {
                  label,
                  value,
                  rightElement: isUnavailable ? <div className="size-2 rounded-full bg-warning" /> : undefined,
                }
              })}
            />
          </div>
          {data.id && status && (
            <div>
              <Select
                value={status.id}
                onValueChange={(value) => {
                  if (!value || value === status.id) return

                  router.patch(
                    urlFor('change_appointment_status.execute', { id: data.id }),
                    { statusId: value },
                    { onFinish: close }
                  )
                }}
                trigger={
                  <Button variant="secondary" className="text-white border-white bg-transparent hover:bg-white/20">
                    {status.name}
                    <Select.TriggerIcon />
                  </Button>
                }
                align="end"
                items={statuses.map((s) => ({
                  label: s.name,
                  value: s.id,
                  leftElement: <DynamicIcon name={s.icon as IconName} size={22} />,
                  variant: s.sortOrder > 100 ? 'destructive' : undefined,
                }))}
              />
            </div>
          )}
        </div>
      </Drawer.Header>
      <Drawer.Body>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Servicio</h2>
          <div className="flex items-center gap-4 hover:bg-background rounded-xl -m-2 p-2">
            <div
              className="w-1 h-auto rounded-full self-stretch shrink-0"
              style={{ backgroundColor: service!.color }}
            />
            <div className="flex flex-col grow">
              <div className="flex items-start gap-4">
                <div className="flex flex-1 flex-col gap-1 py-2">
                  <div className="text-[17px]/6 font-medium">{service!.name}</div>

                  <div className="text-[15px]/5 text-muted">
                    {`${startDate.toFormat('h:mma')} - ${endDate.toFormat('h:mma')}`.toLowerCase()}
                  </div>
                </div>
                <div className="ml-auto">
                  <Button
                    size="icon-sm"
                    variant="secondary"
                    onClick={() => {
                      setData('serviceId', '')
                      setData('startDate', '')
                      setData('agendaId', '')
                      goToStep(0)
                    }}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col gap-2 items-start mt-2">
                <Select
                  align="start"
                  className="min-w-85 w-85"
                  value={agenda?.id}
                  trigger={
                    <Button variant="secondary" className="pl-0.5 gap-3">
                      <Avatar fullName={agenda?.fullName} color={agenda?.color} size="xs" />
                      <span className="text-[14px]/4">{agenda?.fullName}</span>
                      <Popover.TriggerIcon />
                    </Button>
                  }
                  onValueChange={(value) => {
                    if (value) setData('agendaId', value)
                  }}
                  items={agendas?.map((item) => ({
                    label: item.fullName,
                    value: item.id,
                    leftElement: <Avatar fullName={item.fullName} color={item?.color} size="xs" />,
                  }))}
                />
                {isSelectedAgendaAvailable === false && (
                  <Badge variant="warning">
                    <CircleAlertIcon />
                    El veterinario no está disponible
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>
      </Drawer.Body>
      <Drawer.Footer className="flex flex-col gap-3 px-8 py-4">
        {service && service.price && (
          <div className="flex flex-col gap-0.5">
            <div className="flex flex-col gap-0.5 pb-1">
              <div className="flex items-center justify-between">
                <div className="text-[15px]/5 text-muted">Subtotal</div>
                <div className="text-[15px]/5 text-muted">{formatPrice(service.price * (1 - 0.16), 2)}</div>
              </div>
              <div className="flex items-center justify-between">
                <div className="text-[15px]/5 text-muted">IVA (16%)</div>
                <div className="text-[15px]/5 text-muted">{formatPrice(service.price * 0.16, 2)}</div>
              </div>
            </div>
            <hr className="my-3" />
            <div className="flex items-center justify-between">
              <div className="text-[17px]/6 font-semibold">A pagar</div>
              <div className="text-[17px]/6 font-semibold">{formatPrice(service.price, 2)}</div>
            </div>
          </div>
        )}
        <Button
          type="button"
          onClick={next}
          className="w-full"
          variant="primary"
          size="lg"
          disabled={(!!data.id && !isDirty) || !canContinue}
        >
          Guardar
        </Button>
      </Drawer.Footer>
    </Drawer.MainPanel>
  )
}
