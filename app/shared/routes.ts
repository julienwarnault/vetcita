import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.on('/').redirect('dashboard.render')
    router.get('dashboard', [controllers.shared.Dashboard, 'render'])
    router.on('settings').renderInertia('settings/show', {}).as('settings')
  })
  .use([middleware.auth(), middleware.requireTenant()])
