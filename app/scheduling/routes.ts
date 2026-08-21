import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        router.get('settings/shifts', [controllers.scheduling.ListShifts, 'render'])
        router.get('settings/closed-dates/new', [controllers.scheduling.CreateClosedDate, 'render'])
        router.post('settings/closed-dates', [controllers.scheduling.CreateClosedDate, 'execute'])
        router.get('settings/closed-dates/edit/:id', [controllers.scheduling.UpdateClosedDate, 'render'])
        router.put('settings/closed-dates/:id', [controllers.scheduling.UpdateClosedDate, 'execute'])
        router.delete('settings/closed-dates/:id', [controllers.scheduling.DeleteClosedDate, 'execute'])
        router.get('settings/time-offs/new', [controllers.scheduling.CreateTimeOff, 'render'])
        router.post('settings/time-offs', [controllers.scheduling.CreateTimeOff, 'execute'])
        router.get('settings/time-offs/edit/:id', [controllers.scheduling.UpdateTimeOff, 'render'])
        router.put('settings/time-offs/:id', [controllers.scheduling.UpdateTimeOff, 'execute'])
        router.delete('settings/time-offs/:id', [controllers.scheduling.DeleteTimeOff, 'execute'])
        router.get('settings/working-hours/:agendaId', [controllers.scheduling.UpdateWorkingHours, 'render'])
        router.put('settings/working-hours/:agendaId', [controllers.scheduling.UpdateWorkingHours, 'execute'])
        router.get('settings/schedule-days/new', [controllers.scheduling.CreateScheduleDay, 'render'])
        router.post('settings/schedule-days', [controllers.scheduling.CreateScheduleDay, 'execute'])
        router.get('settings/schedule-days/edit/:id', [controllers.scheduling.UpdateScheduleDay, 'render'])
        router.put('settings/schedule-days/:id', [controllers.scheduling.UpdateScheduleDay, 'execute'])
        router.delete('settings/schedule-days/:id', [controllers.scheduling.DeleteScheduleDay, 'execute'])
      })
      .use([middleware.requireRole({ roles: ['owner', 'admin'] })])
  })
  .use([middleware.auth(), middleware.requireTenant()])

router.get('api/bookable-days', [controllers.scheduling.GetBookableDays, 'render'])
router.get('api/bookable-slots', [controllers.scheduling.GetBookableSlots, 'render'])
