import { compose } from '@adonisjs/core/helpers'
import { WithPrimaryUuid } from '#shared/mixins/with_primary_uuid'
import { TenantSchema } from '#database/schema'

export default class Tenant extends compose(TenantSchema, WithPrimaryUuid) {}
