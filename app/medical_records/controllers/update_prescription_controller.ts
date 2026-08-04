import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PrescriptionTransformer from '#medical_records/transformers/prescription_transformer'
import { UpdatePrescription } from '#medical_records/actions/update_prescription'
import { GetPrescription } from '#medical_records/queries/get_prescription'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class UpdatePrescriptionController {
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
    private readonly getPrescription: GetPrescription,
    private readonly updatePrescription: UpdatePrescription
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const [{ pet }, { prescription }] = await Promise.all([
      this.getPet.execute({ id: params.petId, tenantId }),
      this.getPrescription.execute({ id: params.id, tenantId }),
    ])

    return inertia.render('prescriptions/forms', {
      pet: PetTransformer.transform(pet),
      prescription: PrescriptionTransformer.transform(prescription),
    })
  }

  async execute({ request, params, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdatePrescriptionController.validator)
    await withTransaction(() => {
      return this.updatePrescription.execute({
        id: params.id,
        petId: params.petId,
        tenantId,
        ...payload,
      })
    })

    return response.redirect().back()
  }
}
