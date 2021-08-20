import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import Mark from 'App/Models/Mark'
import { UserType } from 'Contracts/enums'
import Attendance from 'App/Models/Attendance'

export default class TeachersController {
  public async addClass({ request, auth, response }: HttpContextContract) {
    await auth.user?.related('classes').create({
      class: request.input('class'),
      section: request.input('section').toUpperCase(),
      subject: request.input('subject'),
      schoolId: auth.user!.schoolId,
    })
    return response.redirect('/dashboard')
  }

  public async classInfo({ params, view, auth }: HttpContextContract) {
    const students = await User.query()
      .where('class', parseInt(params.class))
      .where('section', params.section)
      .where('schoolId', auth.user!.schoolId)
      .where('userType', UserType.STUDENT)
    await auth.user?.load('school')
    await auth.user?.load('sessions')
    return view.render('dashboard/teacherClass', {
      students,
      school: auth.user?.school,
      uClass: params.classId,
      uClassClass: params.class,
      uClassSection: params.section,
      subject: params.subject,
      sessions: auth.user?.sessions,
    })
  }

  public async getStudent({ params, view, auth }: HttpContextContract) {
    const student = await User.find(params.studentId)
    const marks = await Mark.query().where('userId', student!.id)
    await auth.user?.load('school')
    return view.render('dashboard/teacherStudent', { student, marks, school: auth.user?.school })
  }

  public async addSession({ request, response, auth }: HttpContextContract) {
    const startTime = request.input('startTime')
    const endTime = request.input('endTime')
    const classId = request.input('classId')

    await auth.user?.related('sessions').create({
      startTime,
      endTime,
      classId,
    })
    const url =
      '/dashboard/my-classes/' +
      request.input('classId') +
      '/' +
      request.input('class') +
      '/' +
      request.input('section') +
      '/' +
      request.input('subject')
    return response.redirect(url)
  }

  public async sessionInfo({ params, view, auth }: HttpContextContract) {
    const { sessionId } = params

    await auth.user?.load('school')
    const attendances = await Attendance.query()
      .where('sessionId', parseInt(sessionId))
      .preload('user')
    return view.render('dashboard/teacherSession', {
      attendances,
      school: auth.user?.school,
      sessionId,
    })
  }

  public async userNotAttend({ request, response }: HttpContextContract) {
    const attendance = await Attendance.findOrFail(request.input('attendanceId'))
    await attendance.delete()

    return response.redirect(`/dashboard/my-sessions/${request.input('sessionId')}`)
  }

  public async addStudentMark({ request, response }: HttpContextContract) {
    const student = await User.find(parseInt(request.input('studentId')))
    console.log(request.input('examDate'))
    await student?.related('marks').create({
      marks: request.input('mark'),
      totalMarks: request.input('totalMark'),
      subject: request.input('subject'),
      examDate: request.input('examDate'),
    })

    return response.redirect(`/dashboard/students/${student?.id}`)
  }
}
