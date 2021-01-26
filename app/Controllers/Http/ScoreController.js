'use strict'

const Score = use('App/Models/Score')
const Database = use('Database')

class ScoreController {

    async index({ response }) {
        let scores = await User.all()
        return response.json(scores)
    }

    //mostrar las calificaciones de alumnos
    async show({ params, response }) {
        const score = await Score.find(params.id)
        return response.json(score)
    }


    //almacenar calificaciones de cierto alumno
    async store({ request, response }) {
        const scoreInfo = request.only(['user_id', 'subject_id', 'bi1', 'bi2', 'bi3', 'bi4', 'bi5'])

        const score = new Score()
        score.user_id = scoreInfo.user_id
        score.subject_id = scoreInfo.subject_id
        score.bi1 = scoreInfo.bi1
        score.bi2 = scoreInfo.bi2
        score.bi3 = scoreInfo.bi3
        score.bi4 = scoreInfo.bi4
        score.bi5 = scoreInfo.bi5

        await score.save()

        return response.status(201).json(score)
    }

    //obtener las calificaciones de cierto alumno y materia
    async getScoresByAlumn({ request, response }) {
        const inInfo = request.only(['subject_id', 'user_id'])
        const scoresStudent = await Database.from('scores').where({ user_id: inInfo.user_id, subject_id: inInfo.subject_id })

        return response.json(scoresStudent)
    }

    //actualizar calificaciones
    async updateScore({ params, request, response }) {
        const scoreInfo = request.only(['bi1', 'bi2', 'bi3', 'bi4', 'bi5'])

        const score = await Score.find(params.id)
        if (!score) {
            return response.status(404).json({ data: 'Resource not found' })
        }

        score.bi1 = scoreInfo.bi1
        score.bi2 = scoreInfo.bi2
        score.bi3 = scoreInfo.bi3
        score.bi4 = scoreInfo.bi4
        score.bi5 = scoreInfo.bi5

        await score.save()

        return response.status(200).json(score)
    }

}

module.exports = ScoreController