import { Data } from '@generated/data'
import { router } from '@inertiajs/react'
import { SettingsHeader } from '~/components/settings_header'
import { formatDuration, formatPrice } from '~/lib/utils'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { FiltersBar } from '~/components/filters_bar'
import { Empty } from '~/components/ui/empty'
import { InertiaProps } from '~/types'
import { urlFor } from '~/lib/tuyau'

type PageProps = InertiaProps<{
  services: Data.Services.Service[]
}>

export default function List(props: PageProps) {
  const { services } = props

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
                <div className="flex gap-2">
                  <div className="text-[15px]/5 font-medium">{formatPrice(service.price ?? 0)}</div>
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
