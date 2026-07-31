import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Species from '#pets/models/species'

export default class extends BaseSeeder {
  async run() {
    await Species.createMany([
      { name: 'Perro', illustrationUrl: '/illustrations/dog.jpg' },
      { name: 'Gato', illustrationUrl: '/illustrations/cat.jpg' },
      { name: 'Ave', illustrationUrl: '/illustrations/bird.jpg' },
      { name: 'Conejo', illustrationUrl: '/illustrations/rabbit.jpg' },
      { name: 'Hamster', illustrationUrl: '/illustrations/hamster.jpg' },
      { name: 'Reptil', illustrationUrl: '/illustrations/reptiless.jpg' },
      { name: 'Pez', illustrationUrl: '/illustrations/fish.jpg' },
      { name: 'Otro', illustrationUrl: '/illustrations/other.jpg' },
    ])
  }
}
