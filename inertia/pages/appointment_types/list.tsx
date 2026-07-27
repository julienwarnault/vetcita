import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { Column, ListTable } from '~/components/ui/list_table'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { formatDuration } from '~/lib/utils'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
}>

export default function List(props: PageProps) {
  const { appointmentTypes } = props

  const columns: Column<Data.AppointmentTypes.AppointmentType>[] = [
    {
      header: 'Nombre',
      width: '34%',
      accessor: 'name',
    },
    {
      header: 'Duración',
      width: '15%',
      accessor: ({ duration }) => formatDuration(duration),
    },
    {
      header: 'Precio',
      width: '15%',
      accessor: ({ price }) => (price ? `$${price} MXN` : '-'),
    },
  ]

  return (
    <div className="flex">
      <div className="container-xl p-10">
        <ViewHeader title="Servicios" badge={appointmentTypes.length.toString()}>
          <ButtonLink route="create_appointment_type.render" size="lg">
            Añadir
          </ButtonLink>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={appointmentTypes}
          onRowClick={(row) => {
            router.visit(urlFor('update_appointment_type.render', { id: row.id }))
          }}
        />
      </div>
    </div>
  )
}
