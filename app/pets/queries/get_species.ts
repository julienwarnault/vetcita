import Species from '#pets/models/species'

export class GetSpecies {
  async execute() {
    const species = await Species.query().orderBy('name')

    return { species }
  }
}
