import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.string('email').nullable()
      table.string('phone').nullable()
      table.string('website').nullable()
      table.string('address').nullable()
      table.string('city').nullable()
      table.string('state').nullable()
      table.string('postal_code').nullable()
      table.string('country_code').notNullable().defaultTo('MX')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
