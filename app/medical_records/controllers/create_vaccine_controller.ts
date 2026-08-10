import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateVaccine } from '#medical_records/actions/create_vaccine'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class CreateVaccineController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      date: vine.date(),
      nextDueDate: vine.date().optional(),
      batchNumber: vine.string().optional(),
      manufacturer: vine.string().optional(),
      notes: vine.string().optional(),
    })
  )

  constructor(
    private readonly getPet: GetPet,
    private readonly createVaccine: CreateVaccine
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const { pet } = await this.getPet.execute({ id: params.petId, tenantId })

    return inertia.render('vaccines/forms', {
      pet: PetTransformer.transform(pet),
    })
  }

  async execute({ request, response, params, tenantId, agenda }: HttpContext) {
    const payload = await request.validateUsing(CreateVaccineController.validator)
    await this.getPet.execute({ id: params.petId, tenantId })

    await withTransaction(() => {
      return this.createVaccine.execute({
        ...payload,
        petId: params.petId,
        tenantId,
        agendaId: agenda.id,
      })
    })

    return response.redirect().back()
  }
}
