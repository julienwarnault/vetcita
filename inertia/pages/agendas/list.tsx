import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Column, ListTable } from '~/components/ui/list_table'
import { ViewHeader } from '~/components/view_header'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  agendas: Data.Agendas.Agenda[]
}>

export default function List(props: PageProps) {
  const { agendas } = props

  const { visitModal } = useModalStack()

  const roleLabels = {
    owner: 'Propietario',
    staff: 'Empleado',
    none: 'Sin acceso',
  }

  const columns: Column<Data.Agendas.Agenda>[] = [
    {
      header: 'Nombre',
      width: '45%',
      accessor: (agenda) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar fullName={agenda.name} color={agenda.color} />
            <div className="text-[15px]/5 font-semibold">{agenda.name}</div>
          </div>
        )
      },
    },
    {
      header: 'Contacto',
      width: '30%',
      accessor: (agenda) => agenda.email ?? '-',
    },
    {
      header: 'Rol de permisos',
      width: '25%',
      accessor: (agenda) => roleLabels[agenda.role as keyof typeof roleLabels] ?? agenda.role,
    },
  ]

  return (
    <div className="flex max-h-full min-h-full">
      <div className="container-xl flex flex-col p-10">
        <ViewHeader title="Equipo" badge={agendas.length.toString()}>
          <Button onClick={() => visitModal(urlFor('create_agenda.render'))} size="lg">
            Añadir
          </Button>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={agendas}
          onRowClick={(row) => visitModal(urlFor('update_agenda.render', { id: row.id }))}
        />
      </div>
    </div>
  )
}
