import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Species from '#pets/models/species'

export default class extends BaseSeeder {
  async run() {
    await Species.createMany([
      { name: 'Perro', illustrationUrl: '/illustrations/dog.jpg', order: 1 },
      { name: 'Gato', illustrationUrl: '/illustrations/cat.jpg', order: 2 },
      { name: 'Ave', illustrationUrl: '/illustrations/bird.jpg', order: 3 },
      { name: 'Conejo', illustrationUrl: '/illustrations/rabbit.jpg', order: 4 },
      { name: 'Hamster', illustrationUrl: '/illustrations/hamster.jpg', order: 5 },
      { name: 'Reptil', illustrationUrl: '/illustrations/reptiless.jpg', order: 6 },
      { name: 'Pez', illustrationUrl: '/illustrations/fish.jpg', order: 7 },
      { name: 'Otro', illustrationUrl: '/illustrations/other.jpg', order: 8 },
    ])
  }
}
