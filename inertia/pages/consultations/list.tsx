import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Column, ListTable } from '~/components/ui/list_table'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { ViewHeader } from '~/components/view_header'
import { Empty } from '~/components/ui/empty'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  consultations: Data.MedicalRecords.Consultation[]
}>

export default function List(props: PageProps) {
  const { consultations } = props

  const { visitModal, closeAll } = useModalStack()

  const columns: Column<Data.MedicalRecords.Consultation>[] = [
    {
      header: 'Fecha',
      width: '10%',
      accessor: ({ createdAt }) =>
        DateTime.fromISO(createdAt + '')
          .setZone(DEFAULT_TIMEZONE)
          .setLocale(DEFAULT_LOCALE)
          .toFormat('d ccc. yyyy'),
    },
    {
      header: 'Mascota',
      width: '15%',
      accessor: ({ pet }) => pet?.name ?? '-',
    },
    {
      header: 'Dueño',
      width: '20%',
      accessor: ({ pet }) => pet?.client?.fullName ?? '-',
    },
    {
      header: 'Tipo',
      width: '10%',
      accessor: 'recordType',
    },
    {
      header: 'Agenda',
      width: '15%',
      accessor: ({ agenda }) => agenda?.name ?? '-',
    },
    {
      header: 'Diagnostico',
      width: '20%',
      accessor: ({ diagnosis }) => diagnosis || '-',
    },
  ]

  return (
    <div className="flex max-h-full min-h-full">
      <div className="container-xl flex flex-col p-10">
        <ViewHeader title="Consultas" badge={consultations.length.toString()} />

        <ListTable
          columns={columns}
          data={consultations}
          onRowClick={(consultation) => {
            if (!consultation.petId) {
              return
            }

            closeAll(true)
            visitModal(urlFor('update_consultation.render', { id: consultation.id, petId: consultation.petId }))
          }}
        />

        <Empty
          heading="No hay consultas"
          description="Las consultas aparecerán aquí cuando registres el historial clínico de una mascota."
          visible={consultations.length === 0}
          className="grow"
        />
      </div>
    </div>
  )
}
