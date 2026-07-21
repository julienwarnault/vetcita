import Species from '#pets/models/species'

export class GetSpecies {
  async execute() {
    const species = await Species.query().preload('breeds').orderBy('name')

    return { species }
  }
}
