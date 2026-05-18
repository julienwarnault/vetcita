import router from '@adonisjs/core/services/router'
import '#identity/routes'

router.on('/').renderInertia('home', {}).as('home')

router.where('id', router.matchers.uuid())
