import { type SchemaRules } from '@adonisjs/lucid/types/schema_generator'

export default {
  types: {
    uuid: {
      tsType: 'UUID',
      decorator: '@column()',
      imports: [{ source: '#shared/types', typeImports: ['UUID'] }],
    },
    decimal: {
      decorator: '@column()',
      tsType: 'number',
    },
  },
  tables: {},
  columns: {
    id: {
      tsType: 'UUID',
      decorator: '@column({ isPrimary: true })',
      imports: [{ source: '#shared/types', typeImports: ['UUID'] }],
    },
  },
} satisfies SchemaRules
