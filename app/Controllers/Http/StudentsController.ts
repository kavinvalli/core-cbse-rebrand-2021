import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Attendance from 'App/Models/Attendance'

export default class StudentsController {
  public async setClass({ auth, response, request }: HttpContextContract) {
    auth.user!.class = parseInt(request.input('class'))
    auth.user!.section = request.input('section').toUpperCase()

    await auth.user!.save()
    return response.redirect('/dashboard')
  }

  public async attend({ auth, request, response }: HttpContextContract) {
    const attendance = await Attendance.query()
      .where('userId', auth.user!.id)
      .where('sessionId', parseInt(request.input('sessionId')))
    console.log(attendance)

    if (attendance.length === 0) {
      await auth.user?.related('attendances').create({
        sessionId: parseInt(request.input('sessionId')),
      })
    }

    return response.redirect('/dashboard')
  }
}
