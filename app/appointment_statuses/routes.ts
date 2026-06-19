import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('settings/statuses', [controllers.appointmentStatuses.ListAppointmentStatuses, 'render'])
    router.get('settings/statuses/new', [controllers.appointmentStatuses.CreateAppointmentStatus, 'render'])
    router.post('settings/statuses', [controllers.appointmentStatuses.CreateAppointmentStatus, 'execute'])
    router.get('settings/statuses/:id/edit', [controllers.appointmentStatuses.UpdateAppointmentStatus, 'render'])
    router.put('settings/statuses/:id', [controllers.appointmentStatuses.UpdateAppointmentStatus, 'execute'])
    router.post('settings/statuses/:id/move', [controllers.appointmentStatuses.MoveAppointmentStatus, 'execute'])
    router.delete('settings/statuses/:id', [controllers.appointmentStatuses.DeleteAppointmentStatus, 'execute'])
  })
  .use([middleware.auth()])
