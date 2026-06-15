import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Column, ListTable } from '~/components/ui/list_table'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { ViewHeader } from '~/components/view_header'
import { formatPhoneNumber } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  patients: Data.Patients.Patient[]
}>

export default function List(props: PageProps) {
  const { patients } = props

  const { visitModal } = useModalStack()

  const columns: Column<Data.Patients.Patient>[] = [
    {
      header: 'Nombre del paciente',
      width: '34%',
      accessor: 'fullName',
    },
    {
      header: 'Número de teléfono',
      width: '34%',
      accessor: ({ phone }) => {
        return formatPhoneNumber(phone)
      },
    },
    {
      header: 'Creado el',
      width: '15%',
      accessor: ({ createdAt }) => {
        return DateTime.fromISO(createdAt + '')
          .setZone(DEFAULT_TIMEZONE)
          .setLocale(DEFAULT_LOCALE)
          .toFormat('d ccc. yyyy')
      },
    },
  ]

  return (
    <div className="flex">
      <div className="container-xl p-10">
        <ViewHeader title="Pacientes" badge={patients.length.toString()}>
          <Button onClick={() => visitModal(urlFor('create_patient.render'))} size="lg">
            Añadir
          </Button>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={patients}
          onRowClick={(row) => {
            visitModal(urlFor('get_patient.render', { id: row.id }))
          }}
        />
      </div>
    </div>
  )
}
