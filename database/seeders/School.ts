import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import School from 'App/Models/School'

export default class SchoolSeeder extends BaseSeeder {
  public async run() {
    await School.createMany([
      {
        name: 'Delhi Public School, R.K. Puram',
        address:
          'Kaifi Azmi Marg, KD Colony, Sector 12, Rama Krishna Puram, New Delhi, Delhi 110022',
      },
      {
        name: 'Delhi Public School, Dwarka',
        address: 'Phase I, Dwarka Sector-3, Dwarka, New Delhi, Delhi 110078',
      },
      {
        name: 'Tagore International School, Vasant Vihar',
        address: 'Paschimi Marg, Block C, Vasant Vihar, New Delhi, Delhi 110057',
      },
    ])
  }
}
