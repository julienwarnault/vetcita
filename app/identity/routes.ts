import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('login', [controllers.identity.Login, 'render'])
    router.post('login', [controllers.identity.Login, 'execute'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.post('logout', [controllers.identity.Logout, 'execute'])
  })
  .use(middleware.auth())
