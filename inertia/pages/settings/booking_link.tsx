import { CopyIcon, ExternalLinkIcon, ScanQrCodeIcon } from 'lucide-react'
import { SettingsHeader } from '~/components/settings_header'
import { ViewHeader } from '~/components/view_header'
import { Card } from '~/components/ui/card'
import { downloadFile } from '~/lib/utils'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  publicUrl: string
  qrDataUrl: string
}>

export default function BookingLink(props: PageProps) {
  const { publicUrl, qrDataUrl } = props

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container-lg pb-10">
        <SettingsHeader title="Enlace de reservas" />

        <ViewHeader
          title="Enlace de reservas"
          subtitle="Comparte este enlace o código QR para que tus clientes puedan reservar citas en línea."
        />

        <div className="mx-auto max-w-110 w-full py-12">
          <Card size="lg">
            <img src={qrDataUrl} alt="Booking Qr" className="size-60 mx-auto mt-6 mb-12" />

            <Card className="w-full p-0">
              <div
                className="pl-5 hover:bg-background border-b cursor-pointer"
                onClick={() => navigator.clipboard.writeText(publicUrl)}
              >
                <div className="flex items-center justify-between pr-5 py-4">
                  <div className="text-base/6 font-semibold">Copiar el enlace</div>
                  <CopyIcon size={20} className="flip-x" />
                </div>
              </div>

              <div
                className="pl-5 hover:bg-background border-b cursor-pointer"
                onClick={() => downloadFile(qrDataUrl, 'qrcode-booking')}
              >
                <div className="flex items-center justify-between pr-5 py-4">
                  <div className="text-base/6 font-semibold">Descargar imagen</div>
                  <ScanQrCodeIcon size={20} />
                </div>
              </div>

              <a href={publicUrl} target="_blank" className="block pl-5 hover:bg-background cursor-pointer">
                <div className="flex items-center justify-between pr-5 py-4 cursor-pointer">
                  <div className="text-base/6 font-semibold">Previsualizar enlace</div>
                  <ExternalLinkIcon size={20} />
                </div>
              </a>
            </Card>
          </Card>
        </div>
      </div>
    </div>
  )
}
