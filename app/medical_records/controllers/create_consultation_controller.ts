import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import { CreateConsultation } from '#medical_records/actions/create_consultation'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class CreateConsultationController {
  static validator = vine.create(
    vine.object({
      date: vine.date(),
      recordType: vine.string().optional(),
      weight: vine.number().positive().optional(),
      temperature: vine.number().positive().optional(),
      heartRate: vine.number().positive().optional(),
      respiratoryRate: vine.number().positive().optional(),
      visitReason: vine.string().optional(),
      symptoms: vine.string().optional(),
      diagnosis: vine.string().optional(),
      treatment: vine.string().optional(),
      prescription: vine.string().optional(),
    })
  )

  constructor(
    private readonly getPet: GetPet,
    private readonly createConsultation: CreateConsultation
  ) {}

  async render({ inertia, tenantId, params }: HttpContext) {
    const { pet } = await this.getPet.execute({ id: params.petId, tenantId })

    return inertia.render('consultations/form', {
      pet: PetTransformer.transform(pet),
    })
  }

  async execute({ request, response, params, tenantId, agenda }: HttpContext) {
    const payload = await request.validateUsing(CreateConsultationController.validator)

    await withTransaction(() => {
      return this.createConsultation.execute({
        ...payload,
        petId: params.petId,
        tenantId,
        agendaId: agenda.id,
      })
    })

    return response.redirect().back()
  }
}
