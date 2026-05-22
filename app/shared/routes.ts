import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.on('/').redirect('dashboard')
    router.on('/dashboard').renderInertia('dashboard', {}).as('dashboard')
    router.on('/settings').renderInertia('settings', {}).as('settings')
  })
  .use(middleware.auth())
