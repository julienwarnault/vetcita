import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router
      .group(() => {
        router.get('settings/agendas', [controllers.agendas.ListAgendas, 'render'])
        router.get('settings/agendas/new', [controllers.agendas.CreateAgenda, 'render'])
        router.post('settings/agendas', [controllers.agendas.CreateAgenda, 'execute'])
        router.get('settings/agendas/edit/:id', [controllers.agendas.UpdateAgenda, 'render'])
        router.put('settings/agendas/:id', [controllers.agendas.UpdateAgenda, 'execute'])
      })
      .use([middleware.requireRole({ roles: ['owner'] })])
  })
  .use([middleware.auth(), middleware.requireTenant()])
