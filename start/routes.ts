import router from '@adonisjs/core/services/router'
import '#shared/routes'
import '#identity/routes'

router.where('id', router.matchers.uuid())
