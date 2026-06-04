import { query } from '~/lib/tuyau'

interface BookableDaysParams {
  tenantId: string
  appointmentTypeId: string
  from: string
  to: string
}

interface BookableSlotsParams {
  tenantId: string
  appointmentTypeId: string
  date: string
}

export function bookableDaysQueryOptions(params: BookableDaysParams) {
  return query.getBookableDays.render.queryOptions({ query: params })
}

export function bookableSlotsQueryOptions(params: BookableSlotsParams) {
  return query.getBookableSlots.render.queryOptions({ query: params })
}
