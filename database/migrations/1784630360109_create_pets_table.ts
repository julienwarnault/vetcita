import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('patient_id').references('id').inTable('patients').onDelete('CASCADE')
      table.uuid('tenant_id').references('id').inTable('tenants').onDelete('CASCADE')
      table.string('name').notNullable()
      table.uuid('species_id').nullable().references('id').inTable('species').onDelete('SET NULL')
      table.uuid('breed_id').nullable().references('id').inTable('breeds').onDelete('SET NULL')
      table.date('date_of_birth').nullable()
      table.enum('gender', ['male', 'female', 'unknown']).nullable()
      table.text('notes').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
