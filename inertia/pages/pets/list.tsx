import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Column, ListTable } from '~/components/ui/list_table'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { ViewHeader } from '~/components/view_header'
import { Button } from '~/components/ui/button'
import { Avatar } from '~/components/ui/avatar'
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
      width: '20%',
      accessor: (pet) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar src={pet.species?.illustrationUrl} />
            <div className="text-[15px]/5 font-semibold">{pet.name}</div>
          </div>
        )
      },
    },
    {
      header: 'Cliente',
      width: '15%',
      accessor: ({ client }) => client?.fullName,
    },
    {
      header: 'Especias',
      width: '10%',
      accessor: ({ species }) => species?.name,
    },
    {
      header: 'Sexo',
      width: '10%',
      accessor: 'genderLabel',
    },
    {
      header: 'Raza',
      width: '10%',
      accessor: 'breed',
    },
    {
      header: 'Peso',
      width: '10%',
      accessor: ({ weight }) => (weight ? `${weight} kg` : '-'),
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
