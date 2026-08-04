import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'prescriptions'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.uuid('pet_id').notNullable().references('id').inTable('pets').onDelete('CASCADE')
      table.string('name').notNullable()
      table.text('notes').nullable()
      table.string('type').notNullable()
      table.date('date').notNullable()
      table.integer('interval_days').nullable()
      table.index(['tenant_id', 'pet_id', 'created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
