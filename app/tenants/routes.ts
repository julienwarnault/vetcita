import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('settings/tenant/edit', [controllers.tenants.UpdateTenant, 'render'])
    router.put('settings/tenant', [controllers.tenants.UpdateTenant, 'execute'])
  })
  .use([middleware.auth(), middleware.requireTenant()])
