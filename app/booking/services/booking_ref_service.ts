import { inject } from '@adonisjs/core'
import { randomBytes } from 'node:crypto'
import { transactionContext } from '#shared/contexts/transaction_context'
import Appointment from '#booking/models/appointment'

const MAX_ATTEMPTS = 5

@inject()
export class BookingRefService {
  async generateUnique() {
    const trx = transactionContext.get()

    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
      const ref = this.#generateRef()

      const exists = await Appointment.query({ client: trx }).where('booking_ref', ref).first()

      if (!exists) return ref
    }

    throw new Error('Could not generate a unique booking reference')
  }

  #generateRef(): string {
    return randomBytes(4).toString('hex').toUpperCase()
  }
}
