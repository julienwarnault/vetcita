import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agenda_appointment_type'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table
        .uuid('appointment_type_id')
        .notNullable()
        .references('id')
        .inTable('appointment_types')
        .onDelete('CASCADE')

      table.unique(['agenda_id', 'appointment_type_id'])
      table.index(['agenda_id'])
      table.index(['appointment_type_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
