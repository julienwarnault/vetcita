import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Species from '#pets/models/species'

export default class extends BaseSeeder {
  async run() {
    await Species.createMany([
      { name: 'Perro', illustrationUrl: '/illustrations/dog.png' },
      { name: 'Gato', illustrationUrl: '/illustrations/cat.png' },
      { name: 'Ave', illustrationUrl: '/illustrations/dog.png' },
      { name: 'Conejo', illustrationUrl: '/illustrations/dog.png' },
      { name: 'Hamster', illustrationUrl: '/illustrations/dog.png' },
      { name: 'Reptil', illustrationUrl: '/illustrations/dog.png' },
      { name: 'Pez', illustrationUrl: '/illustrations/dog.png' },
      { name: 'Otro', illustrationUrl: '/illustrations/dog.png' },
    ])
  }
}
