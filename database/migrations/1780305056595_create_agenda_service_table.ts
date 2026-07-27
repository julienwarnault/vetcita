import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'agenda_service'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table.uuid('service_id').notNullable().references('id').inTable('services').onDelete('CASCADE')
      table.unique(['agenda_id', 'service_id'])
      table.index(['agenda_id'])
      table.index(['service_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
