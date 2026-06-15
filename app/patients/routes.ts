import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('patients', [controllers.patients.ListPatients, 'render'])
    router.get('patients/new', [controllers.patients.CreatePatient, 'render'])
    router.post('patients', [controllers.patients.CreatePatient, 'execute'])
    router.get('patients/edit/:id', [controllers.patients.UpdatePatient, 'render'])
    router.get('patients/:id', [controllers.patients.GetPatient, 'render'])
    router.put('patients/:id', [controllers.patients.UpdatePatient, 'execute'])
    router.delete('patients/:id', [controllers.patients.DeletePatient, 'execute'])
    router.get('api/patients', [controllers.patients.ListPatients, 'api'])
    router.get('api/patients/:id', [controllers.patients.GetPatient, 'api'])
  })
  .use([middleware.auth()])
