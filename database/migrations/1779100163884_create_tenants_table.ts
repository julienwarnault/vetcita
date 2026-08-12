import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'tenants'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('name').notNullable()
      table.string('email').nullable()
      table.string('phone').nullable()
      table.string('onboarding_status').notNullable().defaultTo('pending')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
