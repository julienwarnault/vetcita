import { DateTime } from 'luxon'
import { BaseSchema } from '@adonisjs/lucid/schema'
import { AppointmentStatus } from '#appointment_workflow/enums/appointment_status'

export default class extends BaseSchema {
  protected tableName = 'appointment_statuses'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id', 36).primary()
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
      table.string('name').notNullable()
      table.string('color').notNullable()
      table.string('icon').notNullable()
      table.integer('sort_order').notNullable()
      table.boolean('is_custom').notNullable()
      table.uuid('tenant_id').nullable().references('id').inTable('tenants').onDelete('CASCADE')
    })

    this.defer(async (db) => {
      await db.table(this.tableName).multiInsert([
        {
          id: AppointmentStatus.BOOKED,
          name: 'Reservada',
          color: '#6950f3',
          icon: 'calendar-plus-2',
          sort_order: 1,
          is_custom: false,
          created_at: DateTime.now().toSQL(),
          updated_at: DateTime.now().toSQL(),
        },
        {
          id: AppointmentStatus.COMPLETED,
          name: 'Completada',
          color: '#2a2a2a',
          icon: 'calendar-check',
          sort_order: 100,
          is_custom: false,
          created_at: DateTime.now().toSQL(),
          updated_at: DateTime.now().toSQL(),
        },
        {
          id: AppointmentStatus.NO_SHOW,
          name: 'Inasistencia',
          color: '#d4163a',
          icon: 'eye-off',
          sort_order: 101,
          is_custom: false,
          created_at: DateTime.now().toSQL(),
          updated_at: DateTime.now().toSQL(),
        },
        {
          id: AppointmentStatus.CANCELLED,
          name: 'Cancelar',
          color: '#d4163a',
          icon: 'calendar-x',
          sort_order: 102,
          is_custom: false,
          created_at: DateTime.now().toSQL(),
          updated_at: DateTime.now().toSQL(),
        },
      ])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
