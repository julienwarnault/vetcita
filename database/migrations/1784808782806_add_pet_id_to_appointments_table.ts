import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'appointments'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.uuid('pet_id').notNullable().references('id').inTable('pets').onDelete('CASCADE')
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('pet_id')
    })
  }
}
