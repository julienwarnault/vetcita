import { cn } from 'tailwind-variants'
import { ArrowRightIcon } from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { ViewHeader } from '~/components/view_header'
import usePageProps from '~/hooks/use_page_props'
import { Card } from '~/components/ui/card'
import { urlFor } from '~/lib/tuyau'

export default function Settings() {
  const { user } = usePageProps()

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container pb-24 h-full">
        <ViewHeader
          title="Ajustes del workspace"
          subtitle={`Gestiona los ajustes de ${user?.agenda?.tenant?.name}.`}
          className="pt-12 pb-8"
        />

        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-3 gap-6">
            <CardItem
              icon="building-2"
              title="Configuración del negocio"
              description="Personaliza los datos del negocio."
              href={urlFor('update_tenant.render')}
            />
            <CardItem
              icon="calendar"
              title="Gestión de citas"
              description="Configura tu estados de las citas."
              href={urlFor('list_appointment_statuses.render')}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl/8 font-semibold">Presencia online</h2>
            <div className="grid grid-cols-3 gap-6">
              <CardItem
                title="Generador de enlaces"
                description="Crea enlaces de reserva y códigos QR que se puedan compartir."
                href={urlFor('booking_link.render')}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface CardItemProps {
  icon?: IconName
  title: string
  description: string
  href: string
}

function CardItem(props: CardItemProps) {
  const { icon, title, description, href } = props

  return (
    <Link href={href}>
      <Card size="lg" className={cn('flex flex-col gap-4 hover:bg-background', !icon && 'justify-between')}>
        {icon && <DynamicIcon name={icon} size={26} strokeWidth={1.5} className="text-accent" />}

        <div>
          <div className="text-[17px]/6 font-semibold mb-1">{title}</div>
          <div className="text-muted text-[15px]/5">{description}</div>
        </div>

        <div className="flex gap-2 items-center">
          <div className="font-[15px]/20 font-semibold">Ver</div>
          <ArrowRightIcon size={18} />
        </div>
      </Card>
    </Link>
  )
}
