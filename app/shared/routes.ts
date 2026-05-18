import router from '@adonisjs/core/services/router'

router.on('/').redirect('dashboard')
router.on('/dashboard').renderInertia('dashboard', {}).as('dashboard')
router.on('/calendar').renderInertia('calendar', {}).as('calendar')
