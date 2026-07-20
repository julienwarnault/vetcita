import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('shifts', [controllers.scheduling.ListShifts, 'render'])
    router.get('closed-dates/new', [controllers.scheduling.CreateClosedDate, 'render'])
    router.post('closed-dates', [controllers.scheduling.CreateClosedDate, 'execute'])
    router.get('closed-dates/edit/:id', [controllers.scheduling.UpdateClosedDate, 'render'])
    router.put('closed-dates/:id', [controllers.scheduling.UpdateClosedDate, 'execute'])
    router.delete('closed-dates/:id', [controllers.scheduling.DeleteClosedDate, 'execute'])
    router.get('time-offs/new', [controllers.scheduling.CreateTimeOff, 'render'])
    router.post('time-offs', [controllers.scheduling.CreateTimeOff, 'execute'])
    router.get('time-offs/edit/:id', [controllers.scheduling.UpdateTimeOff, 'render'])
    router.put('time-offs/:id', [controllers.scheduling.UpdateTimeOff, 'execute'])
    router.delete('time-offs/:id', [controllers.scheduling.DeleteTimeOff, 'execute'])
    router.get('working-hours/:agendaId', [controllers.scheduling.UpdateWorkingHours, 'render'])
    router.put('working-hours/:agendaId', [controllers.scheduling.UpdateWorkingHours, 'execute'])
    router.get('schedule-days/new', [controllers.scheduling.CreateScheduleDay, 'render'])
    router.post('schedule-days', [controllers.scheduling.CreateScheduleDay, 'execute'])
    router.get('schedule-days/edit/:id', [controllers.scheduling.UpdateScheduleDay, 'render'])
    router.put('schedule-days/:id', [controllers.scheduling.UpdateScheduleDay, 'execute'])
    router.delete('schedule-days/:id', [controllers.scheduling.DeleteScheduleDay, 'execute'])
  })
  .use([middleware.auth()])

router.get('api/bookable-days', [controllers.scheduling.GetBookableDays, 'render'])
router.get('api/bookable-slots', [controllers.scheduling.GetBookableSlots, 'render'])
