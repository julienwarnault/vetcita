import vine from '@vinejs/vine'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import InvitationTransformer from '#agendas/transformers/invitation_transformer'
import { AcceptInvitation } from '#agendas/actions/accept_invitation'
import { withTransaction } from '#shared/utils/with_transaction'
import { GetInvitation } from '#agendas/queries/get_invitation'
import { passwordSchema } from '#shared/validators'

@inject()
export default class AcceptInvitationController {
  static validator = vine.create(
    vine.object({
      firstName: vine.string().trim(),
      lastName: vine.string().trim(),
      phone: vine.string().phone(),
      password: passwordSchema().confirmed({ confirmationField: 'passwordConfirmation' }),
    })
  )

  constructor(
    private readonly acceptInvitation: AcceptInvitation,
    private readonly getInvitation: GetInvitation
  ) {}

  async handle({ inertia, params, auth }: HttpContext) {
    if (auth.user) {
      await auth.use('web').logout()
    }

    const { invitation } = await this.getInvitation.execute({ token: params.token })

    return inertia.render('invitations/accept_invitation', {
      token: params.token,
      invitation: InvitationTransformer.transform(invitation),
    })
  }

  async execute({ request, response, params, auth }: HttpContext) {
    const payload = await request.validateUsing(AcceptInvitationController.validator)

    const { user } = await withTransaction(() => {
      return this.acceptInvitation.execute({ token: params.token, ...payload })
    })

    await auth.use('web').login(user)

    return response.redirect().toRoute('dashboard.render')
  }
}
