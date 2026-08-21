import { Data } from '@generated/data'
import { router } from '@inertiajs/core'
import { useModalStack } from '@inertiaui/modal-react'
import { MailIcon, MoreVerticalIcon, Trash2Icon } from 'lucide-react'
import { ConfirmDialog } from '~/components/ui/confirm_dialog'
import { SettingsHeader } from '~/components/settings_header'
import { ViewHeader } from '~/components/view_header'
import { FiltersBar } from '~/components/filters_bar'
import usePageProps from '~/hooks/use_page_props'
import { Avatar } from '~/components/ui/avatar'
import { Button } from '~/components/ui/button'
import { Empty } from '~/components/ui/empty'
import { Badge } from '~/components/ui/badge'
import { Menu } from '~/components/ui/menu'
import { Card } from '~/components/ui/card'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  agendas: Data.Agendas.Agenda[]
  invitations: Data.Agendas.Invitation[]
}>

export default function List(props: PageProps) {
  const { agendas, invitations } = props

  const { user } = usePageProps()

  const { visitModal } = useModalStack()

  const roleLabels = {
    owner: 'Propietario',
    staff: 'Empleado',
    none: 'Sin acceso',
  }

  const handleDelete = async (agendaId: string) => {
    await ConfirmDialog.call({
      title: 'Eliminar miembro del equipo',
      mutationFn: async (call) => {
        router.delete(urlFor('delete_agenda.execute', { id: agendaId }), {
          onSuccess: () => {
            call.end(true)
          },
        })
      },
    })
  }

  const handleSendInvitation = (agendaId: string) => {
    router.post(urlFor('send_invitation.execute', { id: agendaId }))
  }

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container-lg pb-10">
        <SettingsHeader title="Equipo" />

        <ViewHeader
          title="Equipo"
          subtitle="Gestiona los miembros del equipo, su acceso y los servicios que pueden realizar."
          badge={agendas.length.toString()}
        >
          <Button onClick={() => visitModal(urlFor('create_agenda.render'))} size="lg">
            Añadir
          </Button>
        </ViewHeader>

        <FiltersBar className="bg-white border" />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mt-6">
          {agendas.map((agenda) => {
            const invitation = invitations.find((invitation) => invitation.agendaId === agenda.id)
            return (
              <Card
                key={agenda.id}
                size="lg"
                className="relative flex flex-col items-center gap-5 text-center hover:bg-background cursor-pointer"
                onClick={() => visitModal(urlFor('update_agenda.render', { id: agenda.id }))}
              >
                <div className="absolute top-4 right-4 z-10">
                  <Menu
                    trigger={
                      <Button
                        variant="tertiary"
                        size="sm"
                        onClick={(e) => e.stopPropagation()}
                        disabled={agenda.role === 'owner' || agenda.id == user?.agenda?.id}
                      >
                        <MoreVerticalIcon size={16} />
                      </Button>
                    }
                    align="end"
                  >
                    <Menu.Item
                      disabled={!agenda.email || !!agenda.userId || agenda.role === 'none'}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleSendInvitation(agenda.id)
                      }}
                    >
                      <MailIcon size={16} />
                      Enviar invitación
                    </Menu.Item>

                    <Menu.Separator />

                    <Menu.Item
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(agenda.id)
                      }}
                    >
                      <Trash2Icon size={16} />
                      Eliminar
                    </Menu.Item>
                  </Menu>
                </div>

                <Avatar size="4xl" fullName={agenda.fullName} color={agenda.color} />

                <div className="flex flex-col gap-1">
                  <div className="text-[17px]/6 font-semibold">{agenda.fullName}</div>
                  <div className="text-[15px]/5 text-muted">{agenda.email || 'Sin correo electrónico'}</div>
                </div>

                <div className="flex flex-col gap-2">
                  {invitation && <Badge variant="warning">Invitación pendiente</Badge>}

                  <Badge variant={agenda.role === 'owner' ? 'accent' : 'secondary'}>
                    {roleLabels[agenda.role as keyof typeof roleLabels] ?? agenda.role}
                  </Badge>
                </div>
              </Card>
            )
          })}
        </div>

        <Empty
          heading="No hay miembros del equipo"
          description="Añade el primer miembro para asignarle servicios y configurar sus horarios."
          visible={agendas.length === 0}
          className="grow"
          primaryAction={
            <Button onClick={() => visitModal(urlFor('create_agenda.render'))} size="lg">
              Añadir un miembro
            </Button>
          }
        />
      </div>
    </div>
  )
}
