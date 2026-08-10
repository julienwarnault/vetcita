import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreatePrescription } from '#medical_records/actions/create_prescription'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class CreatePrescriptionController {
  static validator = vine.create(
    vine.object({
      name: vine.string(),
      notes: vine.string().optional(),
      type: vine.string(),
      date: vine.date(),
      intervalDays: vine.number().optional(),
    })
  )

  constructor(
    private readonly getPet: GetPet,
    private readonly createPrescription: CreatePrescription
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const { pet } = await this.getPet.execute({ id: params.petId, tenantId })

    return inertia.render('prescriptions/forms', {
      pet: PetTransformer.transform(pet),
    })
  }

  async execute({ request, response, params, tenantId, agenda }: HttpContext) {
    const payload = await request.validateUsing(CreatePrescriptionController.validator)
    await this.getPet.execute({ id: params.petId, tenantId })

    await withTransaction(() => {
      return this.createPrescription.execute({
        ...payload,
        petId: params.petId,
        tenantId,
        agendaId: agenda.id,
      })
    })

    return response.redirect().back()
  }
}
