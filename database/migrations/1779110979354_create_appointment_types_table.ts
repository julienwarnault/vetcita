import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointment_types'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at')
      table.timestamp('updated_at')
      table.string('name').notNullable()
      table.string('color', 7).notNullable()
      table.integer('duration').notNullable()
      table.integer('price').nullable()
      table.text('description').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
