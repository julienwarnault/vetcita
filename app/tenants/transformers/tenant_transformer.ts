import { BaseTransformer } from '@adonisjs/core/transformers'
import type Tenant from '#tenants/models/tenant'

export default class TenantTransformer extends BaseTransformer<Tenant> {
  toObject() {
    return this.pick(this.resource, [
      'id',
      'name',
      'slug',
      'phone',
      'website',
      'createdAt',
      'updatedAt',
    ])
  }
}
