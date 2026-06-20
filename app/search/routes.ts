import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('search', [controllers.search.Search, 'render'])
  })
  .use([middleware.auth()])
