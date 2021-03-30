'use strict'
const User = use('App/Models/User')
const Database = use('Database')
const Hash = use('Hash')

class UserController {
    async index({ response }) {
        let users = await User.all()

        return response.json(users)
    }
    async show({ params, response }) {
        const user = await User.find(params.id)
        return response.json(user)
    }

    async verifyEmail({ params, response }) {
        const user = await User.findBy('email', params.email);
        if (user == null) {
            return response.json({ data: false });
        } else {
            return response.json({ data: true });
        }
    }

    async studentsNotLesson({ response }) {

        //el id de lesson solo se da cuando existe un registro con el id de user 
        const users = await Database.select('users.id', 'users.email', 'users.username', 'users.type').from('users')
            .leftJoin('lessons', 'users.id', 'lessons.id_user')
            .where({ 'lessons.id': null, 'users.deleted': 0, 'users.activated': 1, 'users.type': 0 })
        return response.json(users)

    }

    async getProfesors({ response }) {
        //el id de lesson solo se da cuando existe un registro con el id de user 
        const users = await Database.from('users').where({ 'users.type': 'Profesor' })
        return response.json(users)
    }

    async changePassword({ request, auth, response }) {
        // get currently authenticated user

        // const user = auth.current.user

        // // verify if current password matches
        // const verifyPassword = await Hash.verify(
        //     request.input('password'),
        //     user.password
        // )

        // // display appropriate message
        // if (!verifyPassword) {
        //     return response.status(400).json({
        //         status: 'error',
        //         message: 'Current password could not be verified! Please try again.'
        //     })
        // }

        // // hash and save new password
        // user.password = await Hash.make(request.input('newPassword'))
        // await user.save()

        return response.json({
            status: 'success',
            message: 'Password updated!'
        })
    }


    async getStudentsActivated({ response }) {

        const users = await Database.from('users').where({ activated: true, deleted: 0 })

        return response.json(users)
    }
    async login({ request, auth, response }) {
        const userData = request.only(['email', 'password'])
        const user = await User.findBy('email', userData.email)
        if (user == null) {
            return response.status(404).json({
                status: 404,
                message: "Usuario invalido"
            })
        }
        try {
            let authAttempt = await auth.attempt(userData.email, userData.password)
            return response.status(200).json({
                logued: true,
                status: 200,
                user: user,
                token: authAttempt.token
            })
        } catch (error) {
            console.log(error);
            return response.status(404).json({
                status: 404,
                message: "error en la contraseña o el nombre de usuario"
            })
        }
    }
    async store({ request, response }) {
        const userInfo = request.only(['username', 'email', 'password', 'age', 'type'])

        const user = new User()
        user.username = userInfo.username
        user.email = userInfo.email
        user.password = userInfo.password
        user.age = userInfo.age
        user.type = userInfo.type

        await user.save()

        return response.status(201).json(user)
    }


    async delete({ params, response }) {
        const user = await User.find(params.id)
        if (!user) {
            return response.status(404).json({ data: 'Resource not found' })
        }
        await user.delete()

        return response.status(204).json(null)
    }

    async update({ params, request, response }) {
        const userInfo = request.only(['username', 'email', 'password', 'age', 'type', "activated"])
        const user = await User.find(params.id)
        if (!user) {
            return response.status(404).json({ data: 'Resource not found' })
        }
        user.username = userInfo.username
        user.email = userInfo.email
        user.password = userInfo.password
        user.age = userInfo.age
        user.type = userInfo.type
        user.activated = userInfo.activated


        await user.save()

        return response.status(200).json(user)
    }

    async changePassword({ params, request, response }) {
        // get currently authenticated user
        const userInfo = request.only(['id', 'password'])
        const user = await User.find(params.id)

        // hash and save new password
        user.password = (userInfo.password)
        await user.save()

        return response.json({
            status: 'success',
            message: 'Password updated!' + user.password
        })
    }
}

module.exports = UserController