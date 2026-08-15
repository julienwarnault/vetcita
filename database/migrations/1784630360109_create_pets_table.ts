import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'pets'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('client_id').notNullable().references('id').inTable('clients').onDelete('CASCADE')
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.string('name').notNullable()
      table.uuid('species_id').notNullable().references('id').inTable('species')
      table.string('breed').nullable()
      table.date('date_of_birth').nullable()
      table.enum('gender', ['male', 'female', 'unknown']).nullable()
      table.boolean('is_neutered').notNullable().defaultTo(false)
      table.string('color').nullable()
      table.decimal('weight', 8, 2).nullable()
      table.string('blood_type').nullable()
      table.string('allergies').nullable()
      table.text('notes').nullable()
      table.index(['tenant_id', 'client_id'])
      table.unique(['tenant_id', 'client_id', 'name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
