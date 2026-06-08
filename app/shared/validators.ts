import vine from '@vinejs/vine'
import type { UUID } from '#shared/types'

export const emailSchema = () => vine.string().email().maxLength(254)
export const passwordSchema = () => vine.string().minLength(8).maxLength(32)

export const uuidSchema = () =>
  vine
    .string()
    .uuid()
    .transform((value) => value as UUID)

export const uuidListSchema = () =>
  vine.array(uuidSchema()).parse((value) => {
    if (typeof value === 'string') {
      return value.split(',').filter(Boolean)
    }
    return value
  })
