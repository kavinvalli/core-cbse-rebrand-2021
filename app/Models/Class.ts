import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import School from './School'
import User from './User'
import Session from './Session'

export default class Class extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public class: number

  @column()
  public section: string

  @column()
  public schoolId: number

  @column()
  public subject: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => School)
  public school: BelongsTo<typeof School>

  @belongsTo(() => User)
  public user: BelongsTo<typeof User>

  @hasMany(() => Session)
  public sessions: HasMany<typeof Session>
}
