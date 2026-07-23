import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'
import '#shared/routes'
import '#identity/routes'
import '#agendas/routes'
import '#appointment_types/routes'
import '#appointment_workflow/routes'
import '#clients/routes'
import '#tenants/routes'
import '#booking/routes'
import '#scheduling/routes'
import '#search/routes'
import '#pets/routes'

transmit.registerRoutes()

router.where('id', router.matchers.uuid())
