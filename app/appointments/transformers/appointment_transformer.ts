import { BaseTransformer } from '@adonisjs/core/transformers'
import AppointmentTypeTransformer from '#app/appointment_types/transformers/appointment_type_transformer'
import PatientTransformer from '#app/patients/transformers/patient_transformer'
import type Appointment from '#appointments/models/appointment'

export default class AppointmentTransformer extends BaseTransformer<Appointment> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'startDate',
        'endDate',
        'appointmentTypeId',
        'patientId',
        'duration',
        'createdAt',
        'updatedAt',
      ]),
      appointmentType: AppointmentTypeTransformer.transform(
        this.whenLoaded(this.resource.appointmentType)
      ),
      patient: PatientTransformer.transform(this.whenLoaded(this.resource.patient)),
    }
  }
}
