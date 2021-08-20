import Session from 'App/Models/Session'
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Class from 'App/Models/Class'
import Mark from 'App/Models/Mark'
import { UserType } from 'Contracts/enums'

export default class MainsController {
  public async renderDashboard({ response, view, auth }: HttpContextContract) {
    console.log(auth.user!.userType)
    if (auth.user!.userType === UserType.STUDENT) {
      const user = auth.user
      await user?.load('school')
      const marks = await Mark.query().where('userId', user!.id)
      const classes = await Class.query()
        .where('class', auth.user!.class!)
        .where('section', auth.user!.section!)
        .where('schoolId', auth.user!.schoolId)

      const classIds = classes.map((classi) => classi.id)
      const sessions = await Session.query().whereIn('classId', classIds).preload('class')
      /* .whereBetween('startTime', [0, currentDateTime]) */
      /* .whereBetween('endTime', [currentDateTime, 100000000000000000000000000000000000000]) */

      return view.render('dashboard/student', { marks, school: user?.school, sessions })
    } else if (auth.user!.userType === UserType.SCHOOL) {
      return response.send(
        'We are working on dashboard for schools. Please wait till further notice'
      )
    } else {
      const user = auth.user
      await user?.load('classes')
      await user?.load('school')
      return view.render('dashboard/teacher', { classes: user?.classes, school: user?.school })
    }
  }
}
