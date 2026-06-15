import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get(':tenantId/booking', [controllers.booking.BookAppointment, 'render'])
router.post(':tenantId/booking', [controllers.booking.BookAppointment, 'execute'])
router.get(':tenantId/booking/:appointmentId/confirm', [
  controllers.booking.ConfirmAppointment,
  'render',
])

router
  .group(() => {
    router.get('calendar', [controllers.booking.ShowCalendar, 'render'])
    router.get('settings/booking-link', [controllers.booking.BookingLink, 'render'])
    router.get('appointments/new', [controllers.booking.CreateAppointment, 'render'])
    router.post('appointments', [controllers.booking.CreateAppointment, 'execute'])
    router.get('appointments/edit/:id', [controllers.booking.UpdateAppointment, 'render'])
    router.put('appointments/:id', [controllers.booking.UpdateAppointment, 'execute'])
  })
  .use([middleware.auth()])
