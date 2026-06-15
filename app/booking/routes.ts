import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get(':tenantId/booking', [controllers.booking.BookAppointment, 'render'])
router.post(':tenantId/booking', [controllers.booking.BookAppointment, 'execute'])
router.get('booking/:appointmentId/confirm', [controllers.booking.ConfirmAppointment, 'render'])

router
  .group(() => {
    router.get('calendar', [controllers.booking.ShowCalendar, 'render'])
    router.get('settings/booking-link', [controllers.booking.BookingLink, 'render'])
    router.get('appointments/:id', [controllers.booking.GetAppointment, 'render'])
  })
  .use([middleware.auth()])
