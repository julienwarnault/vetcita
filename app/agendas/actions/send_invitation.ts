import crypto from 'node:crypto'
import { DateTime } from 'luxon'
import { inject } from '@adonisjs/core'
import mail from '@adonisjs/mail/services/main'
import InvitationNotification from '#notifications/mails/invitation_notification'
import { dispatchAfterCommit } from '#shared/utils/dispatch_after_commit'
import { transactionContext } from '#shared/contexts/transaction_context'
import Invitation from '#agendas/models/invitation'
import Agenda from '#agendas/models/agenda'
import type { UUID } from '#shared/types'
import User from '#identity/models/user'

interface SendInvitationParams {
  agendaId: UUID
  tenantId: UUID
  invitedByUserId: UUID
}

@inject()
export class SendInvitation {
  async execute(params: SendInvitationParams) {
    const trx = transactionContext.get()

    const agenda = await Agenda.query({ client: trx })
      .where('id', params.agendaId)
      .where('tenant_id', params.tenantId)
      .preload('tenant')
      .firstOrFail()

    if (!agenda.email) {
      throw new Error('Agenda email is required')
    }

    if (agenda.userId) {
      throw new Error('Agenda already has a user')
    }

    if (agenda.role === 'none') {
      throw new Error('Agenda role must allow access')
    }

    const existingUser = await User.query({ client: trx }).whereILike('email', agenda.email).first()

    if (existingUser) {
      throw new Error('User already exists')
    }

    await Invitation.query({ client: trx })
      .where('tenant_id', params.tenantId)
      .where('agenda_id', agenda.id)
      .where('status', 'pending')
      .update({ status: 'revoked' })

    const token = crypto.randomBytes(32).toString('hex')
    const tokenHash = crypto.createHash('sha256').update(token).digest('hex')

    const invitation = await Invitation.create(
      {
        tenantId: params.tenantId,
        agendaId: agenda.id,
        invitedByUserId: params.invitedByUserId,
        email: agenda.email,
        token: tokenHash,
        status: 'pending',
        expiresAt: DateTime.now().plus({ days: 7 }),
      },
      { client: trx }
    )

    await dispatchAfterCommit(async () => {
      await mail.send(new InvitationNotification(agenda, invitation, token))
    })

    return { invitation }
  }
}
