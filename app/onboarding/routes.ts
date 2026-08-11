import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('onboarding', [controllers.onboarding.ShowOnboarding, 'render'])
    router.post('onboarding', [controllers.onboarding.UpdateOnboarding, 'execute'])
  })
  .use([middleware.auth()])
