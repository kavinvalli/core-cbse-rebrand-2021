import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Class from './Class'
import Attendance from './Attendance'

export default class Session extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public startTime: DateTime

  @column()
  public endTime: DateTime

  @column()
  public userId: number

  @column()
  public classId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @belongsTo(() => Class)
  public class: BelongsTo<typeof Class>

  @hasMany(() => Attendance)
  public attendances: HasMany<typeof Attendance>
}
