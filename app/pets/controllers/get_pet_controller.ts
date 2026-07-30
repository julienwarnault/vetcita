import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import ConsultationTransformer from '#medical_records/transformers/consultation_transformer'
import { GetPetConsultations } from '#medical_records/queries/get_pet_consultations'
import VaccineTransformer from '#medical_records/transformers/vaccine_transformer'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetPetVaccines } from '#medical_records/queries/get_pet_vaccines'
import { GetPetAppointments } from '#booking/queries/get_pet_appointments'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetPet } from '#pets/queries/get_pet'

@inject()
export default class ShowPetController {
  constructor(
    private readonly getPet: GetPet,
    private readonly getAppointments: GetPetAppointments,
    private readonly getPetConsultations: GetPetConsultations,
    private readonly getPetVaccines: GetPetVaccines
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ pet }, { appointments }, { consultations }, { vaccines }] = await Promise.all([
      this.getPet.execute({
        id: params.id,
        tenantId: user.tenantId,
      }),
      this.getAppointments.execute({
        tenantId: user.tenantId,
        petId: params.id,
      }),
      this.getPetConsultations.execute({
        tenantId: user.tenantId,
        petId: params.id,
      }),
      this.getPetVaccines.execute({
        tenantId: user.tenantId,
        petId: params.id,
      }),
    ])

    return inertia.render('pets/show', {
      pet: PetTransformer.transform(pet),
      appointments: AppointmentTransformer.transform(appointments),
      consultations: ConsultationTransformer.transform(consultations),
      vaccines: VaccineTransformer.transform(vaccines),
    })
  }

  async api({ serialize, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { pet } = await this.getPet.execute({
      id: params.id,
      tenantId: user.tenantId,
    })

    return await serialize.withoutWrapping(PetTransformer.transform(pet))
  }
}
