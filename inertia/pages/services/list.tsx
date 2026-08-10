import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { MoreVerticalIcon, Trash2Icon } from 'lucide-react'
import { ConfirmDialog } from '~/components/ui/confirm_dialog'
import { SettingsHeader } from '~/components/settings_header'
import { formatDuration, formatPrice } from '~/lib/utils'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { FiltersBar } from '~/components/filters_bar'
import { Button } from '~/components/ui/button'
import { Empty } from '~/components/ui/empty'
import { Menu } from '~/components/ui/menu'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  services: Data.Services.Service[]
}>

export default function List(props: PageProps) {
  const { services } = props

  const handleDelete = async (serviceId: string) => {
    await ConfirmDialog.call({
      title: 'Eliminar servicio',
      mutationFn: async (call) => {
        router.delete(urlFor('delete_service.execute', { id: serviceId }), {
          onSuccess: () => {
            call.end(true)
          },
        })
      },
    })
  }

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container-lg pb-10">
        <SettingsHeader title="Servicios" />

        <ViewHeader
          title="Servicios"
          subtitle="Configura la duración, precio y veterinarios disponibles para cada servicio."
          badge={services.length.toString()}
        >
          <ButtonLink route="create_service.render" size="lg">
            Añadir
          </ButtonLink>
        </ViewHeader>

        <FiltersBar className="bg-white border" />

        <div className="flex flex-col gap-4 mt-6">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative flex w-full bg-white hover:bg-background border rounded-xl overflow-hidden"
            >
              <button
                className="absolute inset-0 cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation()
                  router.visit(urlFor('update_service.render', { id: service.id }))
                }}
              />

              <div className="flex justify-between items-center gap-2 py-4 px-6 grow">
                <div className="absolute w-1.5 inset-0" style={{ backgroundColor: service.color }} />

                <div className="flex flex-col gap-.5">
                  <div className="text-[17px]/6 font-medium">{service.name}</div>
                  <div className="text-[15px]/5 text-muted">{formatDuration(service.duration)}</div>
                  {service.description && <div className="text-[15px]/5 text-muted">{service.description}</div>}
                </div>
                <div className="flex gap-2 items-center relative z-10">
                  <div className="text-[15px]/5 font-medium">{formatPrice(service.price ?? 0)}</div>
                  <Menu
                    trigger={
                      <Button variant="tertiary" size="sm" onClick={(e) => e.stopPropagation()}>
                        <MoreVerticalIcon size={16} />
                      </Button>
                    }
                    align="end"
                  >
                    <Menu.Item
                      variant="destructive"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleDelete(service.id)
                      }}
                    >
                      <Trash2Icon size={16} />
                      Eliminar
                    </Menu.Item>
                  </Menu>
                </div>
              </div>
            </div>
          ))}
        </div>

        <Empty
          heading="No hay servicios"
          description="Crea tu primer servicio para poder agendar citas con duración y precio definidos."
          visible={services.length === 0}
          className="grow"
          primaryAction={
            <ButtonLink route="create_service.render" size="lg">
              Añadir un servicio
            </ButtonLink>
          }
        />
      </div>
    </div>
  )
}
