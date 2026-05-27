import { query } from '~/lib/tuyau'

interface NextAvailableSlotParams {
  tenantId: string
  from?: string
}

interface SlotsParams {
  tenantId: string
  date: string
}

export function nextAvailableSlotQueryOptions(params: NextAvailableSlotParams) {
  return query.getNextAvailableSlot.render.queryOptions({ query: params })
}

export function monthAvailabilityQueryOptions(params: SlotsParams) {
  return query.getMonthAvailability.render.queryOptions({ query: params })
}

export function availableSlotsQueryOptions(params: SlotsParams) {
  return query.getAvailableSlots.render.queryOptions({ query: params })
}
