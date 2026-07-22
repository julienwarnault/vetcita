import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { middleware } from '#start/kernel'

router
  .group(() => {
    router.get('pets', [controllers.pets.ListPets, 'render'])
    router.get('pets/new', [controllers.pets.CreatePet, 'render'])
    router.post('pets', [controllers.pets.CreatePet, 'execute'])
    router.get('pets/:id', [controllers.pets.GetPet, 'render'])
    router.get('pets/edit/:id', [controllers.pets.UpdatePet, 'render'])
    router.put('pets/:id', [controllers.pets.UpdatePet, 'execute'])
  })
  .use([middleware.auth()])
