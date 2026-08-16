import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'location_species'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.uuid('location_id').notNullable().references('id').inTable('locations').onDelete('CASCADE')
      table.uuid('species_id').notNullable().references('id').inTable('species').onDelete('CASCADE')
      table.unique(['location_id', 'species_id'])
      table.index(['location_id'])
      table.index(['species_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
