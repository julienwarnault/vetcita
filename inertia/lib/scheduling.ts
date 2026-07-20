import { DateTime, Interval } from 'luxon'
import type { Data } from '@generated/data'
import { DEFAULT_TIMEZONE, eachDayOfInterval } from './date'
import { timeToMinutes } from './utils'

export const DEFAULT_SHIFT = { startTime: '08:00:00', endTime: '19:00:00' }

interface ToShiftsTableParams {
  date: string
  shifts: Data.Scheduling.Shift[]
  closedDates: Data.Scheduling.ClosedDate[]
  scheduleDays: Data.Scheduling.ScheduleDay[]
  timeOffs: Data.Scheduling.TimeOff[]
}

export function toShiftTable(params: ToShiftsTableParams) {
  const { date, shifts, closedDates, scheduleDays, timeOffs } = params

  const minValue = DateTime.fromISO(date).startOf('week')
  const maxValue = DateTime.fromISO(date).endOf('week')

  return {
    dates: eachDayOfInterval({ start: minValue, end: maxValue }),
    shifts: shifts.map((shift) => ({
      date: shift.date,
      agendaId: shift.agendaId,
      start: DateTime.fromISO(shift.start!, { zone: DEFAULT_TIMEZONE }),
      end: DateTime.fromISO(shift.end!, { zone: DEFAULT_TIMEZONE }),
    })),
    scheduleDays: scheduleDays.map((scheduleDay) => ({
      id: scheduleDay.id,
      date: scheduleDay.date!,
      agendaId: scheduleDay.agendaId,
    })),
    closedDates: closedDates.map((closedDate) => ({
      id: closedDate.id,
      description: closedDate.description,
      interval: Interval.fromDateTimes(
        DateTime.fromISO(closedDate.start!).startOf('day'),
        DateTime.fromISO(closedDate.end!).endOf('day')
      ),
    })),
    timeOffs: timeOffs.map((timeOff) => ({
      id: timeOff.id,
      agendaId: timeOff.agendaId,
      type: timeOff.type,
      interval: Interval.fromDateTimes(
        DateTime.max(DateTime.fromISO(timeOff.start!).startOf('day'), minValue).plus({
          minutes: timeToMinutes(timeOff.startTime),
        }),
        DateTime.min(DateTime.fromISO(timeOff.end!).startOf('day'), maxValue.startOf('day')).plus({
          minutes: timeToMinutes(timeOff.endTime),
        })
      ),
    })),
  }
}

export function getNextShift(lastEnd: string): { startTime: string; endTime: string } {
  const parsedEnd = DateTime.fromFormat(lastEnd, 'HH:mm:ss')
  const cap = DateTime.fromFormat('22:00:00', 'HH:mm:ss')
  const max = DateTime.fromFormat('23:55:00', 'HH:mm:ss')

  const base = DateTime.min(parsedEnd, cap)

  const start = DateTime.min(base.plus({ hours: 1 }), max)
  const end = DateTime.min(base.plus({ hours: 2 }), max)

  return { startTime: start.toFormat('HH:mm:ss'), endTime: end.toFormat('HH:mm:ss') }
}
