import type { DateTime } from 'luxon'
import { transactionContext } from '#shared/contexts/transaction_context'
import Consultation from '#medical_records/models/consultation'
import type { UUID } from '#shared/types'
import Pet from '#pets/models/pet'

interface CreateConsultationParams {
  petId: UUID
  agendaId: UUID
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

export class CreateConsultation {
  async execute(params: CreateConsultationParams) {
    const trx = transactionContext.get()

    const pet = await Pet.query({ client: trx })
      .where('id', params.petId)
      .where('tenantId', params.tenantId)
      .firstOrFail()

    const consultation = await Consultation.create(
      {
        tenantId: params.tenantId,
        agendaId: params.agendaId ?? null,
        petId: params.petId,
        date: params.date,
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

    if (params.weight !== undefined) {
      pet.merge({ weight: params.weight })
      await pet.useTransaction(trx!).save()
    }

    return { consultation }
  }
}
