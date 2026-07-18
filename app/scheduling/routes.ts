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
    router.get('working-hours/:agendaId', [controllers.scheduling.UpdateWorkingHours, 'render'])
    router.put('working-hours/:agendaId', [controllers.scheduling.UpdateWorkingHours, 'execute'])
  })
  .use([middleware.auth()])

router.get('api/bookable-days', [controllers.scheduling.GetBookableDays, 'render'])
router.get('api/bookable-slots', [controllers.scheduling.GetBookableSlots, 'render'])
