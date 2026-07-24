import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Species from '#pets/models/species'
import Breed from '#pets/models/breed'

export default class extends BaseSeeder {
  async run() {
    const species = [
      {
        name: 'Perro',
        illustration: 'dog',
        breeds: [
          'Labrador Retriever',
          'Pastor Alemán',
          'Golden Retriever',
          'Chihuahua',
          'Bulldog Francés',
          'Poodle',
          'Beagle',
          'Shih Tzu',
          'Yorkshire Terrier',
          'Dálmata',
          'Boxer',
          'Rottweiler',
          'Schnauzer',
          'Pug',
          'Cocker Spaniel',
          'Schnauzer Miniatura',
          'Husky Siberiano',
          'Bulldog Inglés',
          'Maltés',
          'Border Collie',
        ],
      },
      {
        name: 'Gato',
        illustration: 'cat',
        breeds: [
          'Siames',
          'Persa',
          'Maine Coon',
          'Bengala',
          'Esfinge (Sphynx)',
          'Abisinio',
          'Ragdoll',
          'British Shorthair',
          'Siberiano',
          'Exótico de Pelo Corto',
          'Oriental',
          'American Shorthair',
          'Birmano',
          'Noruego de Bosque',
          'Cornish Rex',
          'Devon Rex',
          'Manx',
          'Sagrado de Birmania',
          'Tonkinés',
          'Balinés',
        ],
      },
    ]

    for (const { name, illustration, breeds } of species) {
      const { id: speciesId } = await Species.create({
        name,
        illustrationUrl: `/illustrations/${illustration}.png`,
      })
      await Breed.createMany(breeds.map((breed) => ({ name: breed, speciesId })))
    }
  }
}
