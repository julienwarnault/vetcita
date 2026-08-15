import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'clients'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').nullable()
      table.string('phone').notNullable()
      table.text('notes').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.index(['tenant_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
