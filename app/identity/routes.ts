import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('signup', [controllers.identity.Signup, 'render'])
    router.post('signup', [controllers.identity.Signup, 'execute'])

    router.get('login', [controllers.identity.Login, 'render'])
    router.post('login', [controllers.identity.Login, 'execute'])

    router.get('forgot-password', [controllers.identity.ForgotPassword, 'render'])
    router.post('forgot-password', [controllers.identity.ForgotPassword, 'execute'])

    router.get('reset-password/:token', [controllers.identity.ResetPassword, 'render'])
    router.post('reset-password', [controllers.identity.ResetPassword, 'execute'])
  })
  .use(middleware.guest())

router
  .group(() => {
    router.get('user/account', [controllers.identity.ShowAccount, 'render'])
    router.put('user/account', [controllers.identity.UpdateAccount, 'execute'])
    router.get('user/account/password', [controllers.identity.UpdatePassword, 'render'])
    router.put('user/account/password', [controllers.identity.UpdatePassword, 'execute'])

    router.post('logout', [controllers.identity.Logout, 'execute'])
  })
  .use(middleware.auth())
