import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { Column, ListTable } from '~/components/ui/list_table'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { formatPhoneNumber } from '~/lib/utils'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  patients: Data.Patients.Patient[]
}>

export default function List(props: PageProps) {
  const { patients } = props

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
          <ButtonLink route="create_patient.render" size="lg">
            Añadir
          </ButtonLink>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={patients}
          onRowClick={(row) => {
            router.visit(urlFor('update_patient.render', { id: row.id }))
          }}
        />
      </div>
    </div>
  )
}
