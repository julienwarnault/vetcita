import { Link } from '@adonisjs/inertia/react'
import { Popover } from './ui/popover'
import { Avatar } from './ui/avatar'
import { appName } from '~/app/app'

interface AppHeaderProps {
  fullName?: string
  tenantName?: string
}

export function AppHeader(props: AppHeaderProps) {
  const { fullName, tenantName } = props

  return (
    <header className="flex h-16 items-center justify-between border-b bg-surface px-4">
      <Link route="dashboard">
        <h1 className="text-xl font-bold">{appName}</h1>
      </Link>
      <div>
        <Popover
          align="end"
          trigger={
            <button>
              <Avatar fullName={fullName} />
            </button>
          }
          sideOffset={16}
          className="w-90 p-4"
        >
          <div className="flex items-center gap-3">
            <Avatar fullName={fullName} size="lg" />
            <div>
              <div className="text-[20px]/7 font-semibold">{fullName}</div>
              <div className="text-muted text-[15px]/5">{tenantName}</div>
            </div>
          </div>
          <hr className="my-4" />
          <Link
            route="logout.execute"
            className="w-full text-left py-2 px-4 rounded-md hover:bg-background"
          >
            Cerrar sesión
          </Link>
        </Popover>
      </div>
    </header>
  )
}
