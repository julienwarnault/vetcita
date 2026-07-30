import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('consultations', [controllers.medicalRecords.ListConsultations, 'render'])
    router.get('pets/:petId/consultations/new', [controllers.medicalRecords.CreateConsultation, 'render'])
    router.post('pets/:petId/consultations', [controllers.medicalRecords.CreateConsultation, 'execute'])
    router.get('pets/:petId/consultations/:id/edit', [controllers.medicalRecords.UpdateConsultation, 'render'])
    router.put('pets/:petId/consultations/:id', [controllers.medicalRecords.UpdateConsultation, 'execute'])
    router.get('pets/:petId/vaccines/new', [controllers.medicalRecords.CreateVaccine, 'render'])
    router.post('pets/:petId/vaccines', [controllers.medicalRecords.CreateVaccine, 'execute'])
    router.get('pets/:petId/vaccines/:id', [controllers.medicalRecords.UpdateVaccine, 'render'])
    router.put('pets/:petId/vaccines/:id', [controllers.medicalRecords.UpdateVaccine, 'execute'])
  })
  .use([middleware.auth()])
