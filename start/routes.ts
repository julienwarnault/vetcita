import router from '@adonisjs/core/services/router'
import '#shared/routes'
import '#identity/routes'
import '#agendas/routes'
import '#appointment_types/routes'
import '#patients/routes'
import '#calendar/routes'

router.where('id', router.matchers.uuid())
