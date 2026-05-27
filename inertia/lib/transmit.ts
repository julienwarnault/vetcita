import { Transmit } from '@adonisjs/transmit-client'

let transmit: Transmit | null = null

if (typeof window !== 'undefined') {
  transmit = new Transmit({
    baseUrl: window.location.origin,
  })
}

export { transmit }
