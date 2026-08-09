import { Data } from '@generated/data'
import { SettingsHeader } from '~/components/settings_header'
import { ButtonLink } from '~/components/ui/button_link'
import { ViewHeader } from '~/components/view_header'
import { InfoItem } from '~/components/ui/info_item'
import { formatPhoneNumber } from '~/lib/utils'
import { Card } from '~/components/ui/card'
import { parseDate } from '~/lib/date'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  tenant: Data.Tenants.Tenant
}>

export default function ShowTenant(props: PageProps) {
  const { tenant } = props

  return (
    <div className="flex-1 h-auto bg-background">
      <div className="container-lg pb-10">
        <SettingsHeader title="Configuración de la clínica" />

        <ViewHeader
          title="Configuración de la clínica"
          subtitle="Consulta y actualiza los datos principales de la clínica."
        >
          <ButtonLink route="update_tenant.render" size="lg" variant="secondary">
            Editar
          </ButtonLink>
        </ViewHeader>

        <Card size="xl">
          <div className="flex flex-col gap-6 w-full">
            <div className="text-[20px]/7 font-semibold">Información de la clínica</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Nombre de la clínica" value={tenant?.name} />
              <InfoItem label="Identificador" value={tenant?.slug} />
              <InfoItem label="Correo electrónico" value={tenant?.email} />
              <InfoItem label="Teléfono" value={formatPhoneNumber(tenant.phone ?? '')} />
              <InfoItem label="Sitio web" value={tenant.website} />
              <InfoItem label="Creada el" value={parseDate(tenant?.createdAt)?.toFormat('d ccc. yyyy')} />
              <hr className="md:col-span-2 my-2" />
              <InfoItem label="Dirección" value={tenant?.address} className="md:col-span-2" />
              <InfoItem label="Ciudad" value={tenant?.city} />
              <InfoItem label="Estado" value={tenant?.state} />
              <InfoItem label="Código postal" value={tenant?.postalCode} />
              <InfoItem label="País" value={tenant?.countryCode} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
