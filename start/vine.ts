import { VineString } from '@vinejs/vine'
import { phoneRule } from '@julienbenac/vine-plugin-phone'
import type { Options } from '@julienbenac/vine-plugin-phone'

declare module '@vinejs/vine' {
  interface VineString {
    phone(options?: Options): this
  }
}

VineString.macro('phone', function (this: VineString, options?: Options) {
  return this.use(phoneRule(options || { countryCode: 'MX' }))
})
