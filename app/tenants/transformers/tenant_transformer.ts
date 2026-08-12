import { BaseTransformer } from '@adonisjs/core/transformers'
import LocationTransformer from '#tenants/transformers/location_transformer'
import type Tenant from '#tenants/models/tenant'

export default class TenantTransformer extends BaseTransformer<Tenant> {
  toObject() {
    return {
      ...this.pick(this.resource, ['id', 'name', 'email', 'phone', 'createdAt', 'updatedAt']),
      location: LocationTransformer.transform(this.whenLoaded(this.resource.location)),
    }
  }
}
