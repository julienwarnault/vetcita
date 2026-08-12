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
      <div className="container-lg pb-24 h-full">
        <ViewHeader
          title="Ajustes del workspace"
          subtitle={`Gestiona los ajustes de ${user?.agenda?.tenant?.name}.`}
          className="pt-12 pb-8"
        />

        <div className="flex flex-col gap-16">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <CardItem
              icon="building-2"
              title="Configuración del negocio"
              description="Personaliza los datos principales del negocio."
              href={urlFor('show_tenant.render')}
            />
            <CardItem
              icon="users"
              title="Equipo"
              description="Gestiona veterinarios, permisos y servicios asignados."
              href={urlFor('list_agendas.render')}
            />
            <CardItem
              icon="book-open"
              title="Servicios"
              description="Define los servicios, precios, duración y veterinarios asociados."
              href={urlFor('list_services.render')}
            />
            <CardItem
              icon="calendar-clock"
              title="Horarios"
              description="Administra turnos, días libres y cierres de la clínica."
              href={urlFor('list_shifts.render')}
            />
            <CardItem
              icon="calendar"
              title="Gestión de citas"
              description="Configura los estados usados para seguir cada cita."
              href={urlFor('list_appointment_statuses.render')}
            />
          </div>

          <div className="flex flex-col gap-4">
            <h2 className="text-2xl/8 font-semibold">Presencia online</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <CardItem
                title="Clínica"
                description="Configura la dirección, los datos de contacto y la información pública de la clínica."
                href={urlFor('update_location.render')}
              />
              <CardItem
                title="Enlace de reservas"
                description="Comparte la página pública de reservas y su código QR."
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
      <Card size="lg" className={cn('flex flex-col gap-4 hover:bg-background h-full', !icon && 'justify-between')}>
        {icon && <DynamicIcon name={icon} size={26} strokeWidth={1.5} className="text-accent" />}

        <div>
          <div className="text-[17px]/6 font-semibold mb-1">{title}</div>
          <div className="text-muted text-[15px]/5">{description}</div>
        </div>

        <div className="flex gap-2 items-center mt-auto">
          <div className="text-[15px]/5 font-semibold">Ver</div>
          <ArrowRightIcon size={18} />
        </div>
      </Card>
    </Link>
  )
}
