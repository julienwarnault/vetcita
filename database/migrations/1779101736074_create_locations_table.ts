import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'locations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('email').nullable()
      table.string('phone').nullable()
      table.string('website').nullable()
      table.json('logo').nullable()
      table.json('cover').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state').nullable()
      table.string('postal_code').nullable()
      table.string('country_code').notNullable().defaultTo('MX')

      table.jsonb('opening_hours').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
