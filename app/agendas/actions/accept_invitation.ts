import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import { transactionContext } from '#shared/contexts/transaction_context'
import Invitation from '#agendas/models/invitation'
import User from '#identity/models/user'

interface AcceptInvitationParams {
  token: string
  firstName: string
  lastName: string
  phone: string
  password: string
}

@inject()
export class AcceptInvitation {
  async execute(params: AcceptInvitationParams) {
    const trx = transactionContext.get()
    const tokenHash = crypto.createHash('sha256').update(params.token).digest('hex')

    const invitation = await Invitation.query({ client: trx })
      .where('token', tokenHash)
      .where('expires_at', '>', DateTime.now().toSQL()!)
      .where('status', 'pending')
      .whereNull('accepted_at')
      .preload('agenda')
      .firstOrFail()

    if (invitation.agenda.userId) {
      throw new Error('Agenda already has a user')
    }

    const existingUser = await User.query({ client: trx }).whereILike('email', invitation.email).first()

    if (existingUser) {
      throw new Error('User already exists')
    }

    const user = await User.create(
      {
        firstName: params.firstName,
        lastName: params.lastName,
        email: invitation.email,
        phone: params.phone,
        password: params.password,
      },
      { client: trx }
    )

    invitation.agenda.merge({
      firstName: params.firstName,
      lastName: params.lastName,
      phone: params.phone,
      userId: user.id,
    })
    await invitation.agenda.useTransaction(trx!).save()

    invitation.merge({
      acceptedAt: DateTime.now(),
      status: 'accepted',
    })
    await invitation.useTransaction(trx!).save()

    return { user }
  }
}
