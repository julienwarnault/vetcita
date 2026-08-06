import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { Column, ListTable } from '~/components/ui/list_table'
import { formatDuration, formatPrice } from '~/lib/utils'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { Empty } from '~/components/ui/empty'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  services: Data.Services.Service[]
}>

export default function List(props: PageProps) {
  const { services } = props

  const columns: Column<Data.Services.Service>[] = [
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
      accessor: ({ price }) => (price ? formatPrice(price) : '-'),
    },
  ]

  return (
    <div className="flex max-h-full min-h-full">
      <div className="container-xl flex flex-col p-10">
        <ViewHeader title="Servicios" badge={services.length.toString()}>
          <ButtonLink route="create_service.render" size="lg">
            Añadir
          </ButtonLink>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={services}
          onRowClick={(row) => {
            router.visit(urlFor('update_service.render', { id: row.id }))
          }}
        />

        <Empty
          heading="No hay servicios"
          description="Crea tu primer servicio para poder agendar citas con duración y precio definidos."
          visible={services.length === 0}
          className="grow"
          primaryAction={
            <ButtonLink route="create_service.render" size="lg">
              Añadir un servicio
            </ButtonLink>
          }
        />
      </div>
    </div>
  )
}
