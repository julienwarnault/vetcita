import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetPetAppointments } from '#booking/queries/get_pet_appointments'
import { CreateVaccine } from '#medical_records/actions/create_vaccine'
import { withTransaction } from '#shared/utils/with_transaction'
import PetTransformer from '#pets/transformers/pet_transformer'
import { uuidSchema } from '#shared/validators'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class CreateVaccineController {
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
    private readonly createVaccine: CreateVaccine
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const [{ pet }, { appointments }] = await Promise.all([
      this.getPet.execute({ id: params.petId, tenantId }),
      this.getPetAppointments.execute({ petId: params.petId, tenantId }),
    ])

    return inertia.render('vaccines/forms', {
      pet: PetTransformer.transform(pet),
      appointments: AppointmentTransformer.transform(appointments),
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
