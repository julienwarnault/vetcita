import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import UserTransformer from '#identity/transformers/user_transformer'
import { GetSpecies } from '#pets/queries/get_species'

@inject()
export default class ShowOnboardingController {
  constructor(private readonly getSpecies: GetSpecies) {}

  async render({ inertia, auth }: HttpContext) {
    const user = auth.getUserOrFail()
    const { species } = await this.getSpecies.execute()

    return inertia.render('onboarding/form', {
      authUser: UserTransformer.transform(user),
      species: SpeciesTransformer.transform(species),
    })
  }
}
