import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import VaccineTransformer from '#medical_records/transformers/vaccine_transformer'
import { UpdateVaccine } from '#medical_records/actions/update_vaccine'
import { GetVaccine } from '#medical_records/queries/get_vaccine'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class UpdateVaccineController {
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
    private readonly getVaccine: GetVaccine,
    private readonly updateVaccine: UpdateVaccine
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const [{ pet }, { vaccine }] = await Promise.all([
      this.getPet.execute({ id: params.petId, tenantId }),
      this.getVaccine.execute({ id: params.id, tenantId }),
    ])

    return inertia.render('vaccines/forms', {
      pet: PetTransformer.transform(pet),
      vaccine: VaccineTransformer.transform(vaccine),
    })
  }

  async execute({ request, params, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateVaccineController.validator)
    await withTransaction(() => {
      return this.updateVaccine.execute({
        id: params.id,
        petId: params.petId,
        tenantId,
        ...payload,
      })
    })

    return response.redirect().back()
  }
}
