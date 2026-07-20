import { inject } from '@adonisjs/core'
import { Interval, type DateTime } from 'luxon'
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

type ScheduleDay = {
  agendaId: UUID
  date: DateTime
  shifts: { startTime: string; endTime: string }[]
}

type ClosedDate = {
  start: DateTime
  end: DateTime
}

type TimeOff = {
  agendaId: UUID
  start: DateTime
  end: DateTime
  startTime: string
  endTime: string
}

type BuildShiftsParams = {
  from: DateTime
  to: DateTime
  agendaIds: UUID[]
  workingHours: WorkingHour[]
  scheduleDays: ScheduleDay[]
  closedDates: ClosedDate[]
  timeOffs: TimeOff[]
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

      const scheduleDay = this.#findScheduleDay(agendaId, date, params.scheduleDays)

      const shifts = scheduleDay
        ? this.#buildFromScheduleDay(agendaId, date, scheduleDay)
        : this.#buildFromWorkingHours(agendaId, date, params.workingHours)

      return this.#subtractTimeOffs(
        shifts,
        params.timeOffs.filter((timeOff) => timeOff.agendaId === agendaId)
      )
    })
  }

  #isClosedDate(date: DateTime, closedDates: ClosedDate[]) {
    const day = date.startOf('day')

    return closedDates.some((closedDate) => {
      return day >= closedDate.start.startOf('day') && day <= closedDate.end.startOf('day')
    })
  }

  #buildFromScheduleDay(agendaId: UUID, date: DateTime, scheduleDay: ScheduleDay) {
    return scheduleDay.shifts
      .map((shift) => ({
        agendaId,
        date: date.toISODate()!,
        start: this.#combineDateAndTime(date, shift.startTime),
        end: this.#combineDateAndTime(date, shift.endTime),
      }))
      .filter((shift) => shift.start < shift.end)
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

  #findScheduleDay(agendaId: UUID, date: DateTime, scheduleDays: ScheduleDay[]) {
    return scheduleDays.find((scheduleDay) => {
      return scheduleDay.agendaId === agendaId && scheduleDay.date.hasSame(date, 'day')
    })
  }

  #subtractTimeOffs(shifts: Shift[], timeOffs: TimeOff[]) {
    let result = shifts

    for (const timeOff of timeOffs) {
      const periods = this.#expandTimeOff(timeOff)

      for (const period of periods) {
        result = result.flatMap((shift) => this.#subtractPeriod(shift, period))
      }
    }

    return result.filter((shift) => shift.start < shift.end)
  }

  #expandTimeOff(timeOff: TimeOff): Array<{ start: DateTime; end: DateTime }> {
    return this.timeService.getDatesBetween(timeOff.start, timeOff.end).map((date) => ({
      start: this.#combineDateAndTime(date, timeOff.startTime),
      end: this.#combineDateAndTime(date, timeOff.endTime),
    }))
  }

  #subtractPeriod(shift: Shift, period: { start: DateTime; end: DateTime }): Shift[] {
    const shiftInterval = Interval.fromDateTimes(shift.start, shift.end)
    const periodInterval = Interval.fromDateTimes(period.start, period.end)

    if (!shiftInterval.overlaps(periodInterval)) {
      return [shift]
    }

    return shiftInterval.difference(periodInterval).map((interval) => ({
      ...shift,
      start: interval.start!,
      end: interval.end!,
    }))
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
