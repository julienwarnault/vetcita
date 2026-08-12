import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get(':slug/booking', [controllers.booking.BookAppointment, 'render'])
router.post(':slug/booking', [controllers.booking.BookAppointment, 'execute'])
router.get(':slug/booking/:appointmentId/confirm', [controllers.booking.ConfirmAppointment, 'render'])

router
  .group(() => {
    router.get('calendar', [controllers.booking.ShowCalendar, 'render'])
    router.get('appointments/new', [controllers.booking.CreateAppointment, 'render'])
    router.post('appointments', [controllers.booking.CreateAppointment, 'execute'])
    router.get('appointments/edit/:id', [controllers.booking.UpdateAppointment, 'render'])
    router.put('appointments/:id', [controllers.booking.UpdateAppointment, 'execute'])
    router.patch('appointments/:id/status', [controllers.booking.ChangeAppointmentStatus, 'execute'])

    router
      .group(() => {
        router.get('settings/booking-link', [controllers.booking.BookingLink, 'render'])
      })
      .use([middleware.requireRole({ roles: ['owner'] })])
  })
  .use([middleware.auth(), middleware.requireTenant()])
