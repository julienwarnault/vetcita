import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('settings/appointment-statuses', [
      controllers.appointmentStatuses.ListAppointmentStatuses,
      'render',
    ])
    router.get('settings/appointment-statuses/new', [
      controllers.appointmentStatuses.CreateAppointmentStatus,
      'render',
    ])
    router.post('settings/appointment-statuses', [
      controllers.appointmentStatuses.CreateAppointmentStatus,
      'execute',
    ])
    router.get('settings/appointment-statuses/:id/edit', [
      controllers.appointmentStatuses.UpdateAppointmentStatus,
      'render',
    ])
    router.put('settings/appointment-statuses/:id', [
      controllers.appointmentStatuses.UpdateAppointmentStatus,
      'execute',
    ])
    router.post('settings/appointment-statuses/:id/move', [
      controllers.appointmentStatuses.MoveAppointmentStatus,
      'execute',
    ])
    router.delete('settings/appointment-statuses/:id', [
      controllers.appointmentStatuses.DeleteAppointmentStatus,
      'execute',
    ])
  })
  .use([middleware.auth()])
