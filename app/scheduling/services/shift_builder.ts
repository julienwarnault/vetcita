import type { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { DEFAULT_TIMEZONE, TimeService } from '#shared/services/time_service'
import type { UUID } from '#shared/types'

export type Shift = {
  agendaId: UUID
  date: string
  start: DateTime
  end: DateTime
}

type WorkingHour = {
  agendaId: UUID
  dayOfWeek: number
  startTime: string
  endTime: string
}

type ClosedDate = {
  start: DateTime
  end: DateTime
}

type BuildShiftsParams = {
  from: DateTime
  to: DateTime
  agendaIds: UUID[]
  workingHours: WorkingHour[]
  closedDates: ClosedDate[]
}

@inject()
export class ShiftBuilder {
  constructor(private readonly timeService: TimeService) {}

  build(params: BuildShiftsParams): Shift[] {
    return params.agendaIds.flatMap((agendaId) => {
      return this.#buildForAgenda(agendaId, params)
    })
  }

  #buildForAgenda(agendaId: UUID, params: BuildShiftsParams): Shift[] {
    const dates = this.timeService.getDatesBetween(params.from, params.to)

    return dates.flatMap((date) => {
      if (this.#isClosedDate(date, params.closedDates)) return []

      return this.#buildFromWorkingHours(agendaId, date, params.workingHours)
    })
  }

  #isClosedDate(date: DateTime, closedDates: ClosedDate[]) {
    const day = date.startOf('day')

    return closedDates.some((closedDate) => {
      return day >= closedDate.start.startOf('day') && day <= closedDate.end.startOf('day')
    })
  }

  #buildFromWorkingHours(agendaId: UUID, date: DateTime, workingHours: WorkingHour[]) {
    const agendaWorkingHours = workingHours.filter(
      (workingHour) => workingHour.agendaId === agendaId && date.weekday === workingHour.dayOfWeek
    )

    return agendaWorkingHours.map((workingHour) => {
      return {
        agendaId,
        date: date.toISODate()!,
        start: this.#combineDateAndTime(date, workingHour.startTime),
        end: this.#combineDateAndTime(date, workingHour.endTime),
      }
    })
  }

  #combineDateAndTime(date: DateTime, time: string): DateTime {
    const [hour, minute, second = '0'] = time.split(':')

    return date.setZone(DEFAULT_TIMEZONE).set({
      hour: Number(hour),
      minute: Number(minute),
      second: Number(second),
      millisecond: 0,
    })
  }
}
