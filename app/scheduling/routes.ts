import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('api/bookable-days', [controllers.scheduling.GetBookableDays, 'render'])
router.get('api/bookable-slots', [controllers.scheduling.GetBookableSlots, 'render'])
