import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        router.get('settings/tenant', [controllers.tenants.ShowTenant, 'render'])
        router.get('settings/tenant/edit', [controllers.tenants.UpdateTenant, 'render'])
        router.put('settings/tenant', [controllers.tenants.UpdateTenant, 'execute'])
        router.get('settings/location/edit', [controllers.tenants.UpdateLocation, 'render'])
        router.put('settings/location', [controllers.tenants.UpdateLocation, 'execute'])
      })
      .use([middleware.requireRole({ roles: ['owner'] })])
  })
  .use([middleware.auth(), middleware.requireTenant()])
