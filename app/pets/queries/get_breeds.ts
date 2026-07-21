import type { UUID } from '#app/shared/types'
import Breed from '#pets/models/breed'

interface GetBreedsParams {
  speciesId?: UUID
}

export class GetBreeds {
  async execute(params: GetBreedsParams) {
    const breeds = await Breed.query()
      .if(params.speciesId, (q) => q.where('speciesId', params.speciesId!))
      .preload('species')
      .orderBy('name')

    return { breeds }
  }
}
