import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'invitations'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('tenant_id').notNullable().references('id').inTable('tenants').onDelete('CASCADE')
      table.uuid('agenda_id').notNullable().references('id').inTable('agendas').onDelete('CASCADE')
      table.uuid('invited_by_user_id').nullable().references('id').inTable('users').onDelete('SET NULL')
      table.string('email', 254).notNullable()
      table.string('token', 128).notNullable().unique()
      table.string('status').notNullable()
      table.timestamp('expires_at').notNullable()
      table.timestamp('accepted_at').nullable()
      table.index(['tenant_id', 'agenda_id', 'status'])
      table.index(['token'])
      table.index(['expires_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
