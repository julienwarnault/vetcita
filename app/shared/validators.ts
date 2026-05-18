import vine from '@vinejs/vine'

export const emailSchema = () => vine.string().email().maxLength(254)
export const passwordSchema = () => vine.string().minLength(8).maxLength(32)
