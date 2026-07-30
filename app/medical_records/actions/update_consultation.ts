import { transactionContext } from '#shared/contexts/transaction_context'
import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'

interface UpdateConsultationParams {
  id: UUID
  petId: UUID
  tenantId: UUID
  appointmentId?: UUID
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

export class UpdateConsultation {
  async execute(params: UpdateConsultationParams) {
    const trx = transactionContext.get()

    const consultation = await Consultation.query({ client: trx })
      .where('id', params.id)
      .where('tenantId', params.tenantId)
      .where('petId', params.petId)
      .firstOrFail()

    consultation.merge({
      appointmentId: params.appointmentId ?? null,
      recordType: params.recordType ?? consultation.recordType,
      weight: params.weight ?? null,
      temperature: params.temperature ?? null,
      heartRate: params.heartRate ?? null,
      respiratoryRate: params.respiratoryRate ?? null,
      visitReason: params.visitReason || null,
      symptoms: params.symptoms || null,
      diagnosis: params.diagnosis || null,
      treatment: params.treatment || null,
      prescription: params.prescription || null,
    })

    await consultation.useTransaction(trx!).save()

    return { consultation }
  }
}
