import { BaseTransformer } from '@adonisjs/core/transformers'
import AppointmentStatusTransformer from '#appointment_workflow/transformers/appointment_status_transformer'
import AppointmentTypeTransformer from '#appointment_types/transformers/appointment_type_transformer'
import AgendaTransformer from '#app/agendas/transformers/agenda_transformer'
import PatientTransformer from '#patients/transformers/patient_transformer'
import TenantTransformer from '#tenants/transformers/tenant_transformer'
import type Appointment from '#booking/models/appointment'

export default class AppointmentTransformer extends BaseTransformer<Appointment> {
  toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'startDate',
        'localStartDate',
        'endDate',
        'localEndDate',
        'appointmentTypeId',
        'patientId',
        'agendaId',
        'statusId',
        'duration',
        'bookingRef',
        'createdAt',
        'updatedAt',
      ]),
      appointmentType: AppointmentTypeTransformer.transform(this.whenLoaded(this.resource.appointmentType)),
      patient: PatientTransformer.transform(this.whenLoaded(this.resource.patient)),
      tenant: TenantTransformer.transform(this.whenLoaded(this.resource.tenant)),
      agenda: AgendaTransformer.transform(this.whenLoaded(this.resource.agenda)),
      status: AppointmentStatusTransformer.transform(this.whenLoaded(this.resource.status)),
    }
  }
}
