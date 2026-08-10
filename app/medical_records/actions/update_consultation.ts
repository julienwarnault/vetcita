import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface UpdateConsultationParams {
  id: UUID
  petId: UUID
  tenantId: UUID
  date: DateTime
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

    const pet = await Pet.query({ client: trx })
      .where('id', params.petId)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    consultation.merge({
      date: params.date,
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

    if (params.weight !== undefined) {
      pet.merge({ weight: params.weight })
      await pet.useTransaction(trx!).save()
    }

    return { consultation }
  }
}
