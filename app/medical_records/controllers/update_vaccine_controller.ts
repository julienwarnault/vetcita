import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import VaccineTransformer from '#medical_records/transformers/vaccine_transformer'
import { GetPetAppointments } from '#booking/queries/get_pet_appointments'
import { UpdateVaccine } from '#medical_records/actions/update_vaccine'
import { GetVaccine } from '#medical_records/queries/get_vaccine'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { uuidSchema } from '#shared/validators'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class UpdateVaccineController {
  static validator = vine.create(
    vine.object({
      appointmentId: uuidSchema().optional(),
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
    private readonly getPetAppointments: GetPetAppointments,
    private readonly getVaccine: GetVaccine,
    private readonly updateVaccine: UpdateVaccine
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ pet }, { appointments }, { vaccine }] = await Promise.all([
      this.getPet.execute({ id: params.petId, tenantId: user.tenantId }),
      this.getPetAppointments.execute({ petId: params.petId, tenantId: user.tenantId }),
      this.getVaccine.execute({ id: params.id, tenantId: user.tenantId }),
    ])

    return inertia.render('vaccines/forms', {
      pet: PetTransformer.transform(pet),
      appointments: AppointmentTransformer.transform(appointments),
      vaccine: VaccineTransformer.transform(vaccine),
    })
  }

  async execute({ request, params, response, auth }: HttpContext) {
    const payload = await request.validateUsing(UpdateVaccineController.validator)
    const user = auth.getUserOrFail()

    await withTransaction(() => {
      return this.updateVaccine.execute({
        id: params.id,
        petId: params.petId,
        tenantId: user.tenantId,
        ...payload,
      })
    })

    return response.redirect().back()
  }
}
