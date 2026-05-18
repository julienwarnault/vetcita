import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('agendas', [controllers.agendas.ListAgendas, 'render'])
    router.get('agendas/new', [controllers.agendas.CreateAgenda, 'render'])
    router.post('agendas', [controllers.agendas.CreateAgenda, 'execute'])
    router.get('agendas/edit/:id', [controllers.agendas.UpdateAgenda, 'render'])
    router.put('agendas/:id', [controllers.agendas.UpdateAgenda, 'execute'])
  })
  .use([middleware.auth()])
