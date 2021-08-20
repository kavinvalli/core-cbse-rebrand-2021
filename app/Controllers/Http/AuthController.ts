import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import School from 'App/Models/School'

import User from 'App/Models/User'
import { UserType } from 'Contracts/enums'

export default class AuthController {
  public async getLogin({ view }: HttpContextContract) {
    return view.render('auth/login')
  }

  public async getRegister({ view }: HttpContextContract) {
    const schools = await School.all()
    return view.render('auth/register', { schools })
  }

  public async register({ request, response, auth }: HttpContextContract) {
    const name = request.input('name')
    const email = request.input('email')
    const password = request.input('password')
    const schoolId = request.input('school')
    const userType = request.input('userType')

    /* const user = new User() */
    /* user.name = name */
    /* user.email = email */
    /* user.password = password */
    /* const school = await School.find(schoolId) */
    /* user.schoolId = school */

    if (!(await School.find(schoolId))) {
      return response.redirect('/register')
    }

    await (await School.find(schoolId))!.related('users').create({
      name,
      email,
      password,
      userType: userType === '0' ? UserType.STUDENT : UserType.TEACHER,
      isSchoolUser: false,
    })

    await auth.attempt(email, password)

    return response.redirect('/dashboard')
  }

  public async login({ request, response, auth, view }: HttpContextContract) {
    const email = request.input('email')
    const password = request.input('password')

    try {
      await auth.attempt(email, password)
      return response.redirect('/dashboard')
    } catch (error) {
      return view.render('auth/login', {
        error: 'User with email / password does not exist',
      })
    }
  }

  public async logout({ auth, response }: HttpContextContract) {
    await auth.use('web').logout()
    return response.redirect('/login')
  }
}
