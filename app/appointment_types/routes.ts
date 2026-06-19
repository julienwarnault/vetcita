import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('appointment-types', [controllers.appointmentTypes.ListAppointmentTypes, 'render'])
    router.get('appointment-types/new', [controllers.appointmentTypes.CreateAppointmentType, 'render'])
    router.post('appointment-types', [controllers.appointmentTypes.CreateAppointmentType, 'execute'])
    router.get('appointment-types/edit/:id', [controllers.appointmentTypes.UpdateAppointmentType, 'render'])
    router.put('appointment-types/:id', [controllers.appointmentTypes.UpdateAppointmentType, 'execute'])
  })
  .use([middleware.auth()])
