import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('clients', [controllers.clients.ListClients, 'render'])
    router.get('clients/new', [controllers.clients.CreateClient, 'render'])
    router.post('clients', [controllers.clients.CreateClient, 'execute'])
    router.get('clients/edit/:id', [controllers.clients.UpdateClient, 'render'])
    router.get('clients/:id', [controllers.clients.GetClient, 'render'])
    router.put('clients/:id', [controllers.clients.UpdateClient, 'execute'])
    router.delete('clients/:id', [controllers.clients.DeleteClient, 'execute'])
    router.get('api/clients', [controllers.clients.ListClients, 'api'])
    router.get('api/clients/:id', [controllers.clients.GetClient, 'api'])
  })
  .use([middleware.auth(), middleware.requireTenant()])
