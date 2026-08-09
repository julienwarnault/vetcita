import { cn } from 'tailwind-variants'
import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { DynamicIcon, IconName } from 'lucide-react/dynamic'
import { LockIcon, ChevronUpIcon, ChevronDownIcon, Trash2Icon, PencilIcon } from 'lucide-react'
import { SettingsHeader } from '~/components/settings_header'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { Button } from '~/components/ui/button'
import { Menu } from '~/components/ui/menu'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  statuses: Data.AppointmentWorkflow.AppointmentStatus[]
}>

export default function List(props: PageProps) {
  const { statuses } = props

  const handleMove = (statusId: string, direction: 'up' | 'down') => {
    router.post(urlFor('move_appointment_status.execute', { id: statusId }), { direction }, { preserveState: false })
  }

  const handleDelete = (statusId: string) => {
    router.delete(urlFor('delete_appointment_status.execute', { id: statusId }), {
      preserveState: true,
      preserveScroll: true,
    })
  }

  const canMoveUp = (index: number) => {
    if (index === 0) return false
    const previousStatus = statuses[index - 1]
    return previousStatus.isCustom
  }

  const canMoveDown = (index: number) => {
    if (index === statuses.length - 1) return false
    const nextStatus = statuses[index + 1]
    return nextStatus.isCustom
  }

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container-lg pb-10">
        <SettingsHeader title="Estados de las citas" />

        <ViewHeader title="Estados de las citas" subtitle="Crea y gestiona estados de cita personalizados.">
          <ButtonLink route="create_appointment_status.render" size="lg">
            Añadir
          </ButtonLink>
        </ViewHeader>

        <div className="flex flex-col gap-4">
          {statuses.map((status, index) => (
            <div
              key={status.id}
              className={cn(
                'relative overflow-hidden bg-white flex gap-3 items-center justify-between px-6 py-5 border rounded-xl',
                status.isCustom && 'hover:bg-background'
              )}
            >
              {status.isCustom && (
                <button
                  className="absolute inset-0 cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation()
                    if (status.isCustom) {
                      router.visit(urlFor('update_appointment_status.render', { id: status.id }))
                    }
                  }}
                />
              )}

              <div>
                <div className="flex items-center justify-center size-11.5 rounded-lg bg-background">
                  <DynamicIcon name={status.icon as IconName} size={22} />
                </div>
              </div>

              <div className="grow">
                <div className="absolute w-1.5 inset-0 rounded-full" style={{ backgroundColor: status.color }} />
                <div className="flex-1 text-[15px]/5 font-semibold">{status.name}</div>
              </div>

              <div className="relative z-1 gap-2 ml-3">
                {!status.isCustom ? (
                  <LockIcon size={22} />
                ) : (
                  <Menu
                    trigger={
                      <Button variant="secondary" size="sm">
                        Acciones <Menu.TriggerIcon />
                      </Button>
                    }
                    align="end"
                  >
                    <Menu.Item
                      onClick={() => {
                        router.visit(urlFor('update_appointment_status.render', { id: status.id }))
                      }}
                    >
                      <PencilIcon size={16} />
                      Editar
                    </Menu.Item>
                    <Menu.Item variant="destructive" onClick={() => handleDelete(status.id)}>
                      <Trash2Icon size={16} />
                      Eliminar
                    </Menu.Item>
                    <div className="border-t my-1" />
                    <Menu.Item disabled={!canMoveUp(index)} onClick={() => handleMove(status.id, 'up')}>
                      <ChevronUpIcon size={16} />
                      Subir
                    </Menu.Item>
                    <Menu.Item disabled={!canMoveDown(index)} onClick={() => handleMove(status.id, 'down')}>
                      <ChevronDownIcon size={16} />
                      Bajar
                    </Menu.Item>
                  </Menu>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
