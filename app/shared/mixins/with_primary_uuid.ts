import { v7 as randomUUID } from 'uuid'
import { beforeCreate } from '@adonisjs/lucid/orm'
import type { BaseModel } from '@adonisjs/lucid/orm'
import type { NormalizeConstructor } from '@adonisjs/core/types/helpers'
import { UUID } from '#shared/types'

export const WithPrimaryUuid = <Model extends NormalizeConstructor<typeof BaseModel>>(superclass: Model) => {
  class WithPrimaryUuidClass extends superclass {
    static selfAssignPrimaryKey = true

    @beforeCreate()
    static generateId(model: any) {
      model.id = randomUUID() as UUID
    }
  }

  return WithPrimaryUuidClass
}
