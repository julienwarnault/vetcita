import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'consultations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.uuid('pet_id').notNullable().references('id').inTable('pets').onDelete('CASCADE')
      table.uuid('agenda_id').nullable().references('id').inTable('agendas').onDelete('SET NULL')
      table.date('date').notNullable()
      table.string('record_type').notNullable()
      table.decimal('weight', 8, 2).nullable()
      table.decimal('temperature', 4, 1).nullable()
      table.smallint('heart_rate').nullable()
      table.smallint('respiratory_rate').nullable()
      table.text('visit_reason').nullable()
      table.text('symptoms').nullable()
      table.text('diagnosis').nullable()
      table.text('treatment').nullable()
      table.text('prescription').nullable()
      table.index(['tenant_id', 'pet_id', 'date'])
      table.index(['agenda_id'])
      table.index(['tenant_id', 'record_type'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
