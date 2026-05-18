import router from '@adonisjs/core/services/router'
import '#shared/routes'
import '#identity/routes'
import '#agendas/routes'

router.where('id', router.matchers.uuid())
