import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('services', [controllers.services.ListServices, 'render'])
    router.get('services/new', [controllers.services.CreateService, 'render'])
    router.post('services', [controllers.services.CreateService, 'execute'])
    router.get('services/edit/:id', [controllers.services.UpdateService, 'render'])
    router.put('services/:id', [controllers.services.UpdateService, 'execute'])
  })
  .use([middleware.auth()])
