import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import PrescriptionTransformer from '#medical_records/transformers/prescription_transformer'
import ConsultationTransformer from '#medical_records/transformers/consultation_transformer'
import { GetPetConsultations } from '#medical_records/queries/get_pet_consultations'
import { GetPetPrescriptions } from '#medical_records/queries/get_pet_prescriptions'
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
    private readonly getPetVaccines: GetPetVaccines,
    private readonly getPetPrescriptions: GetPetPrescriptions
  ) {}

  async render({ inertia, params, tenantId }: HttpContext) {
    const [{ pet }, { appointments }, { consultations }, { vaccines }, { prescriptions }] = await Promise.all([
      this.getPet.execute({
        id: params.id,
        tenantId,
      }),
      this.getAppointments.execute({
        tenantId,
        petId: params.id,
      }),
      this.getPetConsultations.execute({
        tenantId,
        petId: params.id,
      }),
      this.getPetVaccines.execute({
        tenantId,
        petId: params.id,
      }),
      this.getPetPrescriptions.execute({
        tenantId,
        petId: params.id,
      }),
    ])

    return inertia.render('pets/show', {
      pet: PetTransformer.transform(pet),
      appointments: AppointmentTransformer.transform(appointments),
      consultations: ConsultationTransformer.transform(consultations),
      vaccines: VaccineTransformer.transform(vaccines),
      prescriptions: PrescriptionTransformer.transform(prescriptions),
    })
  }

  async api({ serialize, params, tenantId }: HttpContext) {
    const { pet } = await this.getPet.execute({
      id: params.id,
      tenantId,
    })

    return await serialize.withoutWrapping(PetTransformer.transform(pet))
  }
}
