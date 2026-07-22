import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Column, ListTable } from '~/components/ui/list_table'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { ViewHeader } from '~/components/view_header'
import { Button } from '~/components/ui/button'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  pets: Data.Pets.Pet[]
}>

export default function List(props: PageProps) {
  const { pets } = props

  const { visitModal, closeAll } = useModalStack()

  const columns: Column<Data.Pets.Pet>[] = [
    {
      header: 'Nombre de la mascota',
      width: '30%',
      accessor: 'name',
    },
    {
      header: 'Cliente',
      width: '15%',
      accessor: ({ patient }) => patient?.fullName,
    },
    {
      header: 'Especias',
      width: '15%',
      accessor: ({ species }) => species?.name,
    },
    {
      header: 'Sexo',
      width: '15%',
      accessor: 'genderLabel',
    },
    {
      header: 'Raza',
      width: '15%',
      accessor: ({ breed }) => breed?.name ?? '-',
    },
    {
      header: 'Creado el',
      width: '20%',
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
        <ViewHeader title="Lista de mascotas" badge={pets.length.toString()}>
          <Button
            onClick={() => {
              closeAll()
              visitModal(urlFor('create_pet.render'))
            }}
            size="lg"
          >
            Añadir
          </Button>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={pets}
          onRowClick={(pet) => {
            closeAll(true)
            visitModal(urlFor('get_pet.render', { id: pet.id }))
          }}
        />
      </div>
    </div>
  )
}
