import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'
import '#shared/routes'
import '#identity/routes'
import '#accounts/routes'
import '#agendas/routes'
import '#services/routes'
import '#appointment_workflow/routes'
import '#clients/routes'
import '#tenants/routes'
import '#booking/routes'
import '#scheduling/routes'
import '#search/routes'
import '#pets/routes'
import '#medical_records/routes'
import '#onboarding/routes'

transmit.registerRoutes()

router.where('id', router.matchers.uuid())
router.where('petId', router.matchers.uuid())
router.where('tenantId', router.matchers.uuid())
router.where('slug', router.matchers.slug())

router.attachments()
