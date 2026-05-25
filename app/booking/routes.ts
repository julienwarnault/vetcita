import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get(':tenantId/booking', [controllers.booking.PatientBooking, 'render'])

router
  .group(() => {
    router.get('settings/booling-link', [controllers.booking.BookingLink, 'render'])
  })
  .use([middleware.auth()])
