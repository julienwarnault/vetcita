import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get(':tenantId/booking', [controllers.booking.BookAppointment, 'render'])
router.post(':tenantId/booking', [controllers.booking.BookAppointment, 'execute'])
router.get('booking/:appointmentId/confirm', [controllers.booking.ConfirmAppointment, 'render'])

router
  .group(() => {
    router.get('settings/booking-link', [controllers.booking.BookingLink, 'render'])
  })
  .use([middleware.auth()])
