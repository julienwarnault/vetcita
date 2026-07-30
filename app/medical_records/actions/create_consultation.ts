import { transactionContext } from '#shared/contexts/transaction_context'
import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'

interface CreateConsultationParams {
  petId: UUID
  appointmentId?: UUID
  agendaId: UUID
  tenantId: UUID
  recordType?: string
  weight?: number
  temperature?: number
  heartRate?: number
  respiratoryRate?: number
  visitReason?: string
  symptoms?: string
  diagnosis?: string
  treatment?: string
  prescription?: string
}

export class CreateConsultation {
  async execute(params: CreateConsultationParams) {
    const trx = transactionContext.get()

    const consultation = await Consultation.create(
      {
        tenantId: params.tenantId,
        agendaId: params.agendaId ?? null,
        petId: params.petId,
        appointmentId: params.appointmentId ?? null,
        recordType: params.recordType ?? 'consultation',
        weight: params.weight ?? null,
        temperature: params.temperature ?? null,
        heartRate: params.heartRate ?? null,
        respiratoryRate: params.respiratoryRate ?? null,
        visitReason: params.visitReason || null,
        symptoms: params.symptoms || null,
        diagnosis: params.diagnosis || null,
        treatment: params.treatment || null,
        prescription: params.prescription || null,
      },
      { client: trx }
    )

    return { consultation }
  }
}
