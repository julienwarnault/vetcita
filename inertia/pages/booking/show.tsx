import { Data } from '@generated/data'
import MinimalLayout from '~/layouts/minimal'
import { InertiaProps } from '~/types'

type PageProps = InertiaProps<{
  tenant: Data.Tenants.Tenant
  appointmentTypes: Data.AppointmentTypes.AppointmentType[]
}>

export default function Show(props: PageProps) {
  const { tenant, appointmentTypes } = props

  return (
    <div className="flex">
      <div>Booking:{tenant.id}</div>
    </div>
  )
}

Show.layout = (page: React.ReactElement) => <MinimalLayout>{page}</MinimalLayout>
