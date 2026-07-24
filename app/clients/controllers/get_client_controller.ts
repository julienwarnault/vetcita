import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import AppointmentTransformer from '#booking/transformers/appointment_transformer'
import { GetClientAppointments } from '#booking/queries/get_client_appointments'
import ClientTransformer from '#clients/transformers/client_transformer'
import PetTransformer from '#pets/transformers/pet_transformer'
import { GetClientPets } from '#pets/queries/get_client_pets'
import { GetClient } from '#clients/queries/get_client'

@inject()
export default class ShowClientController {
  constructor(
    private readonly getClient: GetClient,
    private readonly getAppointments: GetClientAppointments,
    private readonly getPets: GetClientPets
  ) {}

  async render({ inertia, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const [{ client }, { appointments }, { pets }] = await Promise.all([
      this.getClient.execute({
        id: params.id,
        tenantId: user.tenantId,
      }),
      this.getAppointments.execute({
        tenantId: user.tenantId,
        clientId: params.id,
      }),
      this.getPets.execute({
        tenantId: user.tenantId,
        clientId: params.id,
      }),
    ])

    return inertia.render('clients/show', {
      client: ClientTransformer.transform(client),
      appointments: AppointmentTransformer.transform(appointments),
      pets: PetTransformer.transform(pets),
    })
  }

  async api({ serialize, params, auth }: HttpContext) {
    const user = auth.getUserOrFail()

    const { client } = await this.getClient.execute({
      id: params.id,
      tenantId: user.tenantId,
    })

    return await serialize.withoutWrapping(ClientTransformer.transform(client))
  }
}
