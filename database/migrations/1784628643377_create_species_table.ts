import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'species'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').primary()
      table.string('name').unique().notNullable()
      table.string('illustration_url').notNullable()
      table.boolean('is_default').notNullable().defaultTo(false)
      table.smallint('order').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
