import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Classes extends BaseSchema {
  protected tableName = 'classes'

  public async up() {
    this.schema.table(this.tableName, (table) => {
      table.string('subject')
    })
  }

  public async down() {
    this.schema.table(this.tableName, (table) => {
      table.dropColumn('subject')
    })
  }
}
