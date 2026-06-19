import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetPatientAppointments } from '#booking/queries/get_patient_appointments'
import PatientTransformer from '#patients/transformers/patient_transformer'
import { GetPatient } from '#patients/queries/get_patient'

@inject()
export default class ShowPatientController {
  constructor(
    private readonly getPatient: GetPatient,
    private readonly getAppointments: GetPatientAppointments
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ patient }, { appointments }] = await Promise.all([
      this.getPatient.execute({
        id: params.id,
        tenantId: user.tenantId,
      }),
      this.getAppointments.execute({
        tenantId: user.tenantId,
        patientId: params.id,
      }),
    ])

    return inertia.render('patients/show', {
      patient: PatientTransformer.transform(patient),
      appointments: AppointmentTransformer.transform(appointments),
    })
  }

  async api({ serialize, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { patient } = await this.getPatient.execute({
      id: params.id,
      tenantId: user.tenantId,
    })

    return await serialize.withoutWrapping(PatientTransformer.transform(patient))
  }
}
