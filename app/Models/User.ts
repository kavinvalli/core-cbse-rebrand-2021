import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import {
  BaseModel,
  column,
  beforeSave,
  belongsTo,
  BelongsTo,
  hasMany,
  HasMany,
} from '@ioc:Adonis/Lucid/Orm'
import { UserType } from 'Contracts/enums'
import School from './School'
import Class from './Class'
import Mark from './Mark'
import Session from './Session'
import Attendance from './Attendance'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public userType: UserType

  @column({ serializeAs: null })
  public password: string

  @column()
  public rememberMeToken?: string

  @column()
  public schoolId: number

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>

  @column()
  public class?: number

  @column()
  public section?: string

  @column()
  public isSchoolUser: boolean

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasMany(() => Class)
  public classes: HasMany<typeof Class>

  @hasMany(() => Mark)
  public marks: HasMany<typeof Mark>

  @hasMany(() => Session) // FOR TEACHERS
  public sessions: HasMany<typeof Session>

  @hasMany(() => Attendance)
  public attendances: HasMany<typeof Attendance>
}
