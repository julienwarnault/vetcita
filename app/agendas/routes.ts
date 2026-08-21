import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router.get('invitations/:token', [controllers.agendas.AcceptInvitation, 'handle'])
router.post('invitations/:token', [controllers.agendas.AcceptInvitation, 'execute'])

router
  .group(() => {
    router
      .group(() => {
        router.get('settings/agendas', [controllers.agendas.ListAgendas, 'render'])
        router.get('settings/agendas/new', [controllers.agendas.CreateAgenda, 'render'])
        router.post('settings/agendas', [controllers.agendas.CreateAgenda, 'execute'])
        router.get('settings/agendas/edit/:id', [controllers.agendas.UpdateAgenda, 'render'])
        router.put('settings/agendas/:id', [controllers.agendas.UpdateAgenda, 'execute'])
        router.post('settings/agendas/:id/invitation', [controllers.agendas.SendInvitation, 'execute'])
        router.delete('settings/agendas/:id', [controllers.agendas.DeleteAgenda, 'execute'])
      })
      .use([middleware.requireRole({ roles: ['owner'] })])
  })
  .use([middleware.auth(), middleware.requireTenant()])
