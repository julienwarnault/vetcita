import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('user/account', [controllers.accounts.ShowAccount, 'render'])
    router.put('user/account', [controllers.accounts.UpdateAccount, 'execute'])
    router.get('user/account/password', [controllers.accounts.UpdatePassword, 'render'])
    router.put('user/account/password', [controllers.accounts.UpdatePassword, 'execute'])
  })
  .use(middleware.auth())
