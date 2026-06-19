import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { Column, ListTable } from '~/components/ui/list_table'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { Avatar } from '~/components/ui/avatar'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  agendas: Data.Agendas.Agenda[]
}>

export default function List(props: PageProps) {
  const { agendas } = props

  const columns: Column<Data.Agendas.Agenda>[] = [
    {
      header: 'Nombre',
      width: '34%',
      accessor: (agenda) => {
        return (
          <div className="flex items-center gap-2">
            <Avatar fullName={agenda.name} color={agenda.color} />
            <div className="text-[15px]/5 font-semibold">{agenda.name}</div>
          </div>
        )
      },
    },
  ]

  return (
    <div className="flex">
      <div className="container-xl p-10">
        <ViewHeader title="Agendas" badge={agendas.length.toString()}>
          <ButtonLink route="create_agenda.render" size="lg">
            Añadir
          </ButtonLink>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={agendas}
          onRowClick={(row) => router.visit(urlFor('update_agenda.render', { id: row.id }))}
        />
      </div>
    </div>
  )
}
