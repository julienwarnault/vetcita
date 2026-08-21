import { BaseMail } from '@adonisjs/mail'
import { urlFor } from '@adonisjs/core/services/url_builder'
import { DEFAULT_LOCALE, DEFAULT_TIMEZONE } from '#shared/services/time_service'
import type Invitation from '#agendas/models/invitation'
import type Agenda from '#agendas/models/agenda'
import { appUrl } from '#config/app'

export default class InvitationNotification extends BaseMail {
  constructor(
    private agenda: Agenda,
    private invitation: Invitation,
    private token: string
  ) {
    super()
  }

  prepare() {
    const tenant = this.agenda.tenant
    const invitationUrl = urlFor('accept_invitation', { token: this.token }, { prefixUrl: appUrl })
    const expiresAtLabel = this.invitation.expiresAt
      .setZone(DEFAULT_TIMEZONE)
      .setLocale(DEFAULT_LOCALE)
      .toFormat('dd/MM/yyyy HH:mm')

    this.message
      .to(this.invitation.email)
      .subject(`[${tenant.name}] Invitación para unirte al equipo`)
      .htmlView('emails/invitation', {
        agenda: this.agenda,
        tenant,
        invitation: this.invitation,
        invitationUrl,
        expiresAtLabel,
      })
  }
}
