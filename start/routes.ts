/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('/', async ({ view }) => {
    return view.render('welcome')
  })

  Route.get('/login', 'AuthController.getLogin')

  Route.get('/register', 'AuthController.getRegister')

  Route.post('/register', 'AuthController.register')

  Route.post('/login', 'AuthController.login')
}).middleware('guest')

Route.group(() => {
  Route.get('/dashboard', 'MainsController.renderDashboard')
  Route.post('/logout', 'AuthController.logout')

  Route.post('/dashboard/student/class', 'StudentsController.setClass')
  Route.post('/dashboard/teacher/class', 'TeachersController.addClass')

  Route.get(
    '/dashboard/my-classes/:classId/:class/:section/:subject',
    'TeachersController.classInfo'
  )
  Route.get('/dashboard/students/:studentId', 'TeachersController.getStudent')
  Route.post('/dashboard/teacher-students/add-mark', 'TeachersController.addStudentMark')

  Route.post('/dashboard/teacher/session', 'TeachersController.addSession')
  Route.post('/dashboard/student/attend', 'StudentsController.attend')

  Route.get('/dashboard/my-sessions/:sessionId', 'TeachersController.sessionInfo')
  Route.post('/dashboard/student/not-attend', 'TeachersController.userNotAttend')
}).middleware('auth')
