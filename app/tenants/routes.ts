import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('tenant/edit', [controllers.tenants.UpdateTenant, 'render'])
    router.put('tenant', [controllers.tenants.UpdateTenant, 'execute'])
  })
  .use([middleware.auth()])
