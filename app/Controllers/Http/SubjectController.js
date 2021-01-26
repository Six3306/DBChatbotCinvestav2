'use strict'
const Subject = use('App/Models/Subject')
const Database = use('Database')

class SubjectController {
    async index({ response }) {
        let subject = await Subject.all()

        return response.json(subject)
    }
    async show({ params, response }) {
        const subject = await Subject.find(params.id)
        return response.json(subject)
    }

    async getByGrade({ request, response }) {
        const subjectInfo = request.only(['grade', ])
        const subject = await Database.from('subjects').where({ grade: subjectInfo.grade, deleted: 0 })

        return response.json(subject)
    }

    //obtener materias segun profesor y grado
    async getByGradeandProfesor({ request, response }) {
        const subjectInfo = request.only(['grade', 'profesor_id'])
        const subject = await Database.from('subjects').where({ grade: subjectInfo.grade, profesor_id: subjectInfo.profesor_id })

        return response.json(subject)
    }


    //obtener grados y materias por profesor
    async getByProfesor({ params, response }) {
        // const subjectInfo = request.only(['idProfesor', ])
        // const lesson = await Lesson.findBy('id_user', params.id)
        const subject = await Database.from('subjects').where({ profesor_id: params.id })
        return response.json(subject)
    }

    async store({ request, response }) {
        const subjectInfo = request.only(['name', 'grade', 'profesor_id'])

        const subject = new Subject()
        subject.name = subjectInfo.name
        subject.grade = subjectInfo.grade
        subject.profesor_id = subjectInfo.profesor_id
        await subject.save()

        return response.status(201).json(subject)
    }

    async update({ params, request, response }) {
        const subjectInfo = request.only(['name', 'grade', 'deleted'])

        const subject = await Subject.find(params.id)
        if (!subject) {
            return response.status(404).json({ data: 'Resource not found' })
        }

        subject.deleted = subjectInfo.deleted
        subject.name = subjectInfo.name
        subject.grade = subjectInfo.grade
        await subject.save()

        return response.status(200).json(subject)
    }

    async delete({ params, response }) {
        const subject = await Subject.find(params.id)
        if (!subject) {
            return response.status(404).json({ data: 'Resource not found' })
        }
        await subject.delete()

        return response.status(204).json(null)
    }
}

module.exports = SubjectController