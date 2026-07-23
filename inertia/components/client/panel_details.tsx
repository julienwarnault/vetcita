import { DateTime } from 'luxon'
import { Data } from '@generated/data'
import { formatPhoneNumber } from '~/lib/utils'
import { DEFAULT_LOCALE } from '~/lib/date'
import { Drawer } from '../ui/drawer'

interface PanelDetailsProps {
  client: Data.Clients.Client
}

export function PanelDetails(props: PanelDetailsProps) {
  const { client } = props

  return (
    <Drawer.MainPanel className="grid grid-rows-[auto_1fr]">
      <Drawer.Header className="border-none px-8 pt-8">
        <h1 className="text-[28px]/9 font-semibold">Datos del cliente</h1>
      </Drawer.Header>
      <Drawer.Body className="flex">
        <div className="flex flex-col gap-6 w-full">
          <div className="text-[20px]/7 font-semibold">Perfil</div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="text-[15px]/5 font-medium">Nombre completo</div>
              <div className="text-[15px]/5 font-normal text-muted">{client.fullName}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Correo electrónico</div>
              <div className="text-[15px]/5 font-normal text-muted">{client.email || '-'}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Teléfono</div>
              <div className="text-[15px]/5 font-normal text-muted">{formatPhoneNumber(client.phone)}</div>
            </div>
            <div>
              <div className="text-[15px]/5 font-medium">Se unió</div>
              <div className="text-[15px]/5 font-normal text-muted">
                {DateTime.fromISO(client.createdAt!).setLocale(DEFAULT_LOCALE).toFormat('d ccc. yyyy')}
              </div>
            </div>
          </div>
        </div>
      </Drawer.Body>
    </Drawer.MainPanel>
  )
}
