import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('settings/statuses', [controllers.appointmentWorkflow.ListAppointmentStatuses, 'render'])
    router.get('settings/statuses/new', [controllers.appointmentWorkflow.CreateAppointmentStatus, 'render'])
    router.post('settings/statuses', [controllers.appointmentWorkflow.CreateAppointmentStatus, 'execute'])
    router.get('settings/statuses/:id/edit', [controllers.appointmentWorkflow.UpdateAppointmentStatus, 'render'])
    router.put('settings/statuses/:id', [controllers.appointmentWorkflow.UpdateAppointmentStatus, 'execute'])
    router.post('settings/statuses/:id/move', [controllers.appointmentWorkflow.MoveAppointmentStatus, 'execute'])
    router.delete('settings/statuses/:id', [controllers.appointmentWorkflow.DeleteAppointmentStatus, 'execute'])
  })
  .use([middleware.auth()])
