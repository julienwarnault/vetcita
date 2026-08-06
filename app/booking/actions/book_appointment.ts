import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { SlotNotBookableException } from '#scheduling/exceptions/slot_not_bookable_exception'
import { CheckSlotBookable } from '#scheduling/actions/check_slot_bookable'
import { FindOrUpdateClient } from '#clients/actions/find_or_update_client'
import { CreateAppointment } from '#booking/actions/create_appointment'
import { FindOrUpdatePet } from '#pets/actions/find_or_update_pet'
import { DEFAULT_TIMEZONE } from '#shared/services/time_service'
import type { UUID } from '#shared/types'

interface BookAppointmentParams {
  tenantId: UUID
  serviceId: UUID
  agendaId: UUID
  startDate: string
  firstName: string
  lastName: string
  phone: string
  email: string
  petName: string
  petSpeciesId: UUID
}

@inject()
export class BookAppointment {
  constructor(
    private findOrUpdateClient: FindOrUpdateClient,
    private findOrUpdatePet: FindOrUpdatePet,
    private readonly checkSlotBookable: CheckSlotBookable,
    private createAppointment: CreateAppointment
  ) {}

  async execute(params: BookAppointmentParams) {
    const { client } = await this.findOrUpdateClient.handle({
      tenantId: params.tenantId,
      firstName: params.firstName,
      lastName: params.lastName,
      email: params.email.toLowerCase().trim(),
      phone: params.phone,
    })

    const { pet } = await this.findOrUpdatePet.handle({
      tenantId: params.tenantId,
      clientId: client.id,
      name: params.petName,
      speciesId: params.petSpeciesId,
    })

    const isBookable = await this.checkSlotBookable.execute({
      tenantId: params.tenantId,
      serviceId: params.serviceId,
      agendaId: params.agendaId,
      start: DateTime.fromISO(params.startDate, { zone: DEFAULT_TIMEZONE }),
    })

    if (!isBookable) {
      throw new SlotNotBookableException()
    }

    return this.createAppointment.execute({
      tenantId: params.tenantId,
      serviceId: params.serviceId,
      agendaId: params.agendaId,
      clientId: client.id,
      petId: pet.id,
      startDate: params.startDate,
      bookingMode: 'web',
    })
  }
}
