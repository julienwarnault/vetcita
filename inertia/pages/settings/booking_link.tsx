import { CheckCircleIcon, CopyIcon, ExternalLinkIcon, ScanQrCodeIcon, XIcon } from 'lucide-react'
import { ButtonLink } from '~/components/ui/button_link'
import { FormHeader } from '~/components/form_header'
import MinimalLayout from '~/layouts/minimal'
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
    <>
      <FormHeader
        leftElement={
          <ButtonLink size="icon-lg" variant="secondary" route="settings">
            <XIcon />
          </ButtonLink>
        }
        rightElement={
          <ButtonLink size="lg" variant="secondary" route="settings">
            OK
          </ButtonLink>
        }
        className="border-b"
      />

      <div className="container-sm">
        <div className="flex flex-col gap-8 mx-auto max-w-110 w-full py-12">
          <div className="flex flex-col items-center text-center">
            <CheckCircleIcon
              size={90}
              strokeWidth={1.5}
              className="inline-flex mb-5 text-success"
            />
            <h3 className="text-2xl/8 font-semibold mb-4">Tu enlace está listo</h3>
            <p className="text-[15px]/5 text-muted">
              Has creado un enlace de reserva. Ahora puedes compartirlo con tus pacientes para que
              puedan reservar sus citas fácilmente.
            </p>
          </div>
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

              <a
                href={publicUrl}
                target="_blank"
                className="block pl-5 hover:bg-background cursor-pointer"
              >
                <div className="flex items-center justify-between pr-5 py-4 cursor-pointer">
                  <div className="text-base/6 font-semibold">Previsualizar enlace</div>
                  <ExternalLinkIcon size={20} />
                </div>
              </a>
            </Card>
          </Card>
        </div>
      </div>
    </>
  )
}

BookingLink.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
