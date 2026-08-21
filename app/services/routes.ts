import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        router.get('settings/services', [controllers.services.ListServices, 'render'])
        router.get('settings/services/new', [controllers.services.CreateService, 'render'])
        router.post('settings/services', [controllers.services.CreateService, 'execute'])
        router.get('settings/services/edit/:id', [controllers.services.UpdateService, 'render'])
        router.put('settings/services/:id', [controllers.services.UpdateService, 'execute'])
        router.delete('settings/services/:id', [controllers.services.DeleteService, 'execute'])
      })
      .use([middleware.requireRole({ roles: ['owner', 'admin'] })])
  })
  .use([middleware.auth(), middleware.requireTenant()])
