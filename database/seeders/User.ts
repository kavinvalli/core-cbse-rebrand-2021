import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    await User.createMany([
      {
        name: 'Delhi Public School, R.K. Puram',
        email: 'dpsrkp@cbse.in',
        password: 'dpsrkp1234',
        schoolId: 1,
        isSchoolUser: true,
      },
      {
        name: 'Delhi Public School, Dwarka',
        email: 'dpsswarka@cbse.in',
        password: 'dpsdwarka1234',
        schoolId: 2,
        isSchoolUser: true,
      },
      {
        name: 'Tagore International School, Vasant Vihar',
        email: 'tisvv@cbse.in',
        password: 'tisvv1234',
        schoolId: 3,
        isSchoolUser: true,
      },
    ])
  }
}
