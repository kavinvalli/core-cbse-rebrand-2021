import BaseSchema from '@ioc:Adonis/Lucid/Schema'
import { UserType } from 'Contracts/enums'

export default class UsersSchema extends BaseSchema {
  protected tableName = 'users'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('email', 255).notNullable()
      table.string('password', 180).notNullable()
      table.string('remember_me_token').nullable()

      table.string('name').notNullable()
      table.enum('user_type', Object.values(UserType)).notNullable()
      table.integer('school_id').unsigned().notNullable()
      table.boolean('is_school_user')
      table.integer('class')
      table.string('section')

      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).notNullable()
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
