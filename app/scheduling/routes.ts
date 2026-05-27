import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'

router.get('api/availability', [controllers.scheduling.GetMonthAvailability, 'render'])
router.get('api/slots', [controllers.scheduling.GetAvailableSlots, 'render'])
router.get('/api/next-slot', [controllers.scheduling.GetNextAvailableSlot, 'render'])
