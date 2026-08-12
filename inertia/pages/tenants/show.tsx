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
        <SettingsHeader title="Negocio" />

        <ViewHeader title="Negocio" subtitle="Consulta y actualiza los datos principales del negocio.">
          <ButtonLink route="update_tenant.render" size="lg" variant="secondary">
            Editar
          </ButtonLink>
        </ViewHeader>

        <Card size="xl">
          <div className="flex flex-col gap-6 w-full">
            <div className="text-[20px]/7 font-semibold">Información del negocio</div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <InfoItem label="Nombre del negocio" value={tenant?.name} />
              <InfoItem label="Correo electrónico" value={tenant?.email} />
              <InfoItem label="Teléfono" value={formatPhoneNumber(tenant.phone ?? '')} />
              <InfoItem label="Creado el" value={parseDate(tenant?.createdAt)?.toFormat('d ccc. yyyy')} />
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
