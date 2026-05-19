import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('/calendar', [controllers.calendar.ShowCalendar, 'render'])
  })
  .use([middleware.auth()])
