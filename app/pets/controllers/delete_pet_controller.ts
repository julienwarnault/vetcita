import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { withTransaction } from '#shared/utils/with_transaction'
import { DeletePet } from '#pets/actions/delete_pet'

@inject()
export default class DeletePetController {
  constructor(private readonly deletePet: DeletePet) {}

  async execute({ params, response }: HttpContext) {
    await withTransaction(() => {
      return this.deletePet.execute({ id: params.id })
    })

    return response.redirect().back()
  }
}
