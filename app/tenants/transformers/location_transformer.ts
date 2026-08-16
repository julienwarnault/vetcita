import { BaseTransformer } from '@adonisjs/core/transformers'
import SpeciesTransformer from '#pets/transformers/species_transformer'
import type Location from '#tenants/models/location'

export default class LocationTransformer extends BaseTransformer<Location> {
  async toObject() {
    return {
      ...this.pick(this.resource, [
        'id',
        'name',
        'slug',
        'email',
        'phone',
        'website',
        'address',
        'city',
        'state',
        'postalCode',
        'countryCode',
        'openingHours',
        'tenantId',
        'createdAt',
        'updatedAt',
      ]),
      logoUrl: this.resource.logo ? await this.resource.logo.getUrl() : null,
      coverUrl: this.resource.cover ? await this.resource.cover.getUrl() : null,
      species: SpeciesTransformer.transform(this.whenLoaded(this.resource.species)),
    }
  }
}
