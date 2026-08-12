import Location from '#tenants/models/location'

interface GetLocationBySlugParams {
  slug: string
}

export class GetLocationBySlug {
  async execute(params: GetLocationBySlugParams) {
    const location = await Location.query().where('slug', params.slug).firstOrFail()

    return { location }
  }
}
