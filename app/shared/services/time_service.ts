import { DateTime } from 'luxon'

export const DEFAULT_TIMEZONE = 'America/Mexico_City'
export const DEFAULT_LOCALE = 'es-MX'

export const ISO_DATE = 'yyyy-MM-dd'

export class TimeService {
  now() {
    return DateTime.now().setZone(DEFAULT_TIMEZONE)
  }

  roundToNearestMinutes(dt: DateTime, nearestTo = 30) {
    const totalMinutes = dt.hour * 60 + dt.minute + dt.second / 60 + dt.millisecond / 60_000
    const rounded = Math.ceil(totalMinutes / nearestTo) * nearestTo
    return dt.startOf('day').plus({ minutes: rounded })
  }
}
