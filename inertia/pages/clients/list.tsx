import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { Column, ListTable } from '~/components/ui/list_table'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '~/lib/date'
import { ViewHeader } from '~/components/view_header'
import { formatPhoneNumber } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import { Empty } from '~/components/ui/empty'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  clients: Data.Clients.Client[]
}>

export default function List(props: PageProps) {
  const { clients } = props

  const { visitModal, closeAll } = useModalStack()

  const columns: Column<Data.Clients.Client>[] = [
    {
      header: 'Nombre del cliente',
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
      header: 'Mascotas',
      width: '10%',
      accessor: ({ pets }) => pets?.length ?? '-',
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
    <div className="flex max-h-full min-h-full">
      <div className="container-xl flex flex-col p-10">
        <ViewHeader title="Clientes" badge={clients.length.toString()}>
          <Button
            onClick={() => {
              closeAll()
              visitModal(urlFor('create_client.render'))
            }}
            size="lg"
          >
            Añadir
          </Button>
        </ViewHeader>

        <ListTable
          columns={columns}
          data={clients}
          onRowClick={(row) => {
            closeAll(true)
            visitModal(urlFor('get_client.render', { id: row.id }))
          }}
        />

        <Empty
          heading="No hay clientes"
          description="Añade tu primer cliente para registrar sus mascotas y próximas citas."
          visible={clients.length === 0}
          className="grow"
          primaryAction={
            <Button
              onClick={() => {
                closeAll()
                visitModal(urlFor('create_client.render'))
              }}
              size="lg"
            >
              Añadir un cliente
            </Button>
          }
        />
      </div>
    </div>
  )
}
