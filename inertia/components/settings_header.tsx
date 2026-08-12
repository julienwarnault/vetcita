import { ArrowLeftIcon } from 'lucide-react'
import { Link } from '@adonisjs/inertia/react'
import { ButtonLink } from './ui/button_link'
import { urlFor } from '~/lib/tuyau'

interface SettingsHeaderProps {
  title: string
}

export function SettingsHeader(props: SettingsHeaderProps) {
  const { title } = props

  return (
    <div className="flex items-center gap-4 pt-8 pb-8">
      <ButtonLink route="show_settings.render" variant="secondary">
        <ArrowLeftIcon />
        Volver
      </ButtonLink>

      <div className="flex items-center text-[15px]/5 font-medium text-muted separator-dot">
        <Link href={urlFor('show_settings.render')} className="hover:text-foreground">
          Ajustes del workspace
        </Link>
        <span className="text-foreground">{title}</span>
      </div>
    </div>
  )
}
