import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { useModalStack } from '@inertiaui/modal-react'
import { CalendarAgendaSelector } from '~/components/calendar/calendar_agenda_selector'
import { Column, ListTable } from '~/components/ui/list_table'
import useSearchParams from '~/hooks/use_search_params'
import { ViewHeader } from '~/components/view_header'
import { FiltersBar } from '~/components/filters_bar'
import { Select } from '~/components/ui/select'
import { Button } from '~/components/ui/button'
import { Badge } from '~/components/ui/badge'
import { Empty } from '~/components/ui/empty'
import { capitalize } from '~/lib/utils'
import { parseDate } from '~/lib/date'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  statusId?: string
  agendaIds?: string[]
  appointments: Data.Booking.Appointment[]
  agendas: Data.Agendas.Agenda[]
  statuses: Data.AppointmentWorkflow.AppointmentStatus[]
}>

export default function List(props: PageProps) {
  const { appointments, agendas, statuses, statusId, agendaIds } = props

  const { visitModal, closeAll } = useModalStack()
  const searchParams = useSearchParams()

  const columns: Column<Data.Booking.Appointment>[] = [
    {
      header: 'Referencia',
      width: '12%',
      accessor: ({ id, bookingRef }) => (
        <button
          type="button"
          className="text-accent hover:text-accent-faded"
          onClick={() => {
            closeAll(true)
            visitModal(urlFor('update_appointment.render', { id }))
          }}
        >
          {bookingRef}
        </button>
      ),
    },
    {
      header: 'Fecha',
      width: '16%',
      accessor: ({ localStartDate }) => {
        return capitalize(parseDate(localStartDate)?.toFormat('ccc. d LLL. yyyy h:mma'))
      },
    },
    {
      header: 'Cliente',
      width: '16%',
      accessor: ({ client }) =>
        client ? (
          <button
            type="button"
            className="text-accent hover:text-accent-faded"
            onClick={(event) => {
              event.stopPropagation()
              closeAll(true)
              visitModal(urlFor('get_client.render', { id: client.id }))
            }}
          >
            {client.fullName}
          </button>
        ) : (
          '-'
        ),
    },
    {
      header: 'Mascota',
      width: '15%',
      accessor: ({ pet }) =>
        pet ? (
          <button
            type="button"
            className="text-accent hover:text-accent-faded"
            onClick={(event) => {
              event.stopPropagation()
              closeAll(true)
              visitModal(urlFor('get_pet.render', { id: pet.id }))
            }}
          >
            {pet.name}
          </button>
        ) : (
          '-'
        ),
    },
    {
      header: 'Servicio',
      width: '18%',
      accessor: ({ service }) => service?.name ?? '-',
    },
    {
      header: 'Veterinario',
      width: '15%',
      accessor: ({ agenda }) => agenda?.fullName ?? '-',
    },
    {
      header: 'Estado',
      width: '14%',
      accessor: ({ status }) => (
        <Badge size="md" color={status?.color}>
          {status?.name}
        </Badge>
      ),
    },
  ]

  return (
    <div className="flex max-h-full min-h-full">
      <div className="container-xl flex flex-col p-10">
        <ViewHeader title="Citas" badge={appointments.length.toString()}>
          <Button
            onClick={() => {
              closeAll()
              visitModal(urlFor('create_appointment.render'))
            }}
            size="lg"
          >
            Añadir
          </Button>
        </ViewHeader>

        <FiltersBar searchPlaceholder="Buscar por referencia">
          <div className="flex gap-3">
            <CalendarAgendaSelector
              agendas={agendas}
              selectedAgendaIds={agendaIds}
              onChange={(agendaIds) => {
                router.reload({ data: { ...searchParams, agendaIds } })
              }}
            />

            <Select
              trigger={<Button variant="secondary" />}
              value={statusId ?? 'all'}
              onValueChange={(statusId) => {
                router.reload({
                  data: { ...searchParams, statusId: statusId === 'all' ? undefined : statusId },
                })
              }}
              items={[
                { label: 'Todos los estados', value: 'all' },
                ...statuses.map((status) => ({
                  label: status.name,
                  value: status.id,
                  leftElement: <span className="size-2 rounded-full" style={{ backgroundColor: status.color }} />,
                })),
              ]}
            />
          </div>
        </FiltersBar>

        <ListTable columns={columns} data={appointments} />

        <Empty
          heading="No hay citas"
          illustration="calendar"
          description="Añade una cita para empezar a organizar la agenda de la clínica."
          visible={appointments.length === 0}
          className="grow"
          primaryAction={
            <Button
              onClick={() => {
                closeAll()
                visitModal(urlFor('create_appointment.render'))
              }}
              size="lg"
            >
              Añadir una cita
            </Button>
          }
        />
      </div>
    </div>
  )
}
