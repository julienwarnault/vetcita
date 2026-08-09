import { Data } from '@generated/data'
import { useModalStack } from '@inertiaui/modal-react'
import { formatPhoneNumber } from '~/lib/utils'
import { InfoItem } from '../ui/info_item'
import { parseDate } from '~/lib/date'
import { Drawer } from '../ui/drawer'
import { Button } from '../ui/button'
import { urlFor } from '~/lib/tuyau'

interface PanelDetailsProps {
  client: Data.Clients.Client
  reload: () => void
}

export function PanelDetails(props: PanelDetailsProps) {
  const { client, reload } = props
  const { visitModal } = useModalStack()

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="border-none px-8 pt-8">
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-[28px]/9 font-semibold">Datos del cliente</h1>
          <Button
            variant="secondary"
            onClick={() => visitModal(urlFor('update_client.render', { id: client.id }), { onClose: reload })}
          >
            Editar
          </Button>
        </div>
      </Drawer.Header>
      <Drawer.Body className="flex">
        <div className="flex flex-col gap-6 w-full">
          <div className="text-[20px]/7 font-semibold">Perfil</div>
          <div className="grid grid-cols-2 gap-4">
            <InfoItem label="Nombre completo" value={client.fullName} />
            <InfoItem label="Correo electrónico" value={client.email} />
            <InfoItem label="Teléfono" value={formatPhoneNumber(client.phone)} />
            <InfoItem label="Creado el" value={parseDate(client.createdAt!)?.toFormat('d ccc. yyyy')} />
          </div>
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
