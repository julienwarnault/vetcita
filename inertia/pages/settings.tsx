import { usePage } from '@inertiajs/react'
import type { Data } from '@generated/data'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { Link, LinkProps } from '@adonisjs/inertia/react'
import { ViewHeader } from '~/components/view_header'
import { Card } from '~/components/ui/card'

export default function Settings() {
  const { user } = usePage<Data.SharedProps>().props

  return (
    <div className="h-full bg-background">
      <div className="container p-10 h-full">
        <ViewHeader
          title="Ajustes del workspace"
          subtitle={`Gestiona los ajustes de ${user?.tenant?.name}.`}
        />

        <div className="grid grid-cols-3">
          <CardItem
            icon="building-2"
            title="Configuración del negocio"
            description="Personaliza los datos del negocio."
            route="update_tenant.render"
          />
        </div>
      </div>
    </div>
  )
}

interface CardItemProps {
  icon: IconName
  title: string
  description: string
  route: LinkProps['route']
}

function CardItem(props: CardItemProps) {
  const { icon, title, description, route } = props

  return (
    <Link route={route}>
      <Card size="lg" className="flex flex-col gap-4 hover:bg-background">
        <DynamicIcon name={icon} size={26} strokeWidth={1.5} className="text-accent" />

        <div>
          <div className="text-[17px]/6 font-semibold mb-1">{title}</div>
          <div className="text-muted text-[15px]/5">{description}</div>
        </div>
      </Card>
    </Link>
  )
}
