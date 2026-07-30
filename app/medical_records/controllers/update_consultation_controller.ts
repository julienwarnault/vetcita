import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ConsultationTransformer from '#medical_records/transformers/consultation_transformer'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { UpdateConsultation } from '#medical_records/actions/update_consultation'
import { GetConsultation } from '#medical_records/queries/get_consultation'
import { GetPetAppointments } from '#booking/queries/get_pet_appointments'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { uuidSchema } from '#shared/validators'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class UpdateConsultationController {
  static validator = vine.create(
    vine.object({
      appointmentId: uuidSchema().optional(),
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
    private readonly getPetAppointments: GetPetAppointments,
    private readonly getConsultation: GetConsultation,
    private readonly updateConsultation: UpdateConsultation
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const [{ pet }, { appointments }, { consultation }] = await Promise.all([
      this.getPet.execute({ id: params.petId, tenantId }),
      this.getPetAppointments.execute({ petId: params.petId, tenantId }),
      this.getConsultation.execute({ id: params.id, tenantId }),
    ])

    return inertia.render('consultations/form', {
      pet: PetTransformer.transform(pet),
      appointments: AppointmentTransformer.transform(appointments),
      consultation: ConsultationTransformer.transform(consultation),
    })
  }

  async execute({ request, params, response, tenantId }: HttpContext) {
    const payload = await request.validateUsing(UpdateConsultationController.validator)

    await withTransaction(() => {
      return this.updateConsultation.execute({
        id: params.id,
        petId: params.petId,
        tenantId,
        ...payload,
      })
    })

    return response.redirect().back()
  }
}
