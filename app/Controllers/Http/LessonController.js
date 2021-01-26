'use strict'
const Lesson = use('App/Models/Lesson')
const Database = use('Database')
class LessonController {

    async index({ response }) {
        let lessons = await Lesson.all()

        return response.json(lessons)
    }
    async show({ params, response }) {
        const lessons = await Lesson.find(params.id)
        return response.json(lessons)
    }

    async getByGrade({ request, response }) {
        const lessonInfo = request.only(['grade']) //se borro una coma , ... despues de grade
        const lessons = await Lesson.findBy('grade', lessonInfo.grade)
        return response.json(lessons)
    }


    async getByGradeAndGroup({ request, response }) {


        const lessonInfo = request.only(['grade', 'group'])
        const users = await Database.from('lessons').where({ grade: lessonInfo.grade, group: lessonInfo.group, 'lessons.deleted': 0, 'users.deleted': 0, 'users.activated': 1 }).innerJoin('users', 'id_user', 'users.id')
            // const lessons = await Lesson.findBy('grade', lessonInfo.grade)

        return response.json(users)
    }

    async store({ request, response }) {
        const lessonInfo = request.only(['id_user', 'grade', 'group'])

        const lesson = new Lesson()
        lesson.id_user = lessonInfo.id_user
        lesson.grade = lessonInfo.grade
        lesson.group = lessonInfo.group
            // lesson.id_subjects = lessonInfo.id_subjects
        await lesson.save()

        return response.status(201).json(lesson)
    }

    async update({ params, request, response }) {
        const lessonInfo = request.only(['id_user', 'grade', 'group', 'deleted'])

        const lesson = await Lesson.find(params.id)
        if (!lesson) {
            return response.status(404).json({ data: 'Resource not found' })
        }

        lesson.deleted = lessonInfo.deleted
        lesson.id_user = lessonInfo.id_user
        lesson.grade = lessonInfo.grade
        lesson.group = lessonInfo.group
            // lesson.id_subjects = lessonInfo.id_subjects


        await lesson.save()

        return response.status(200).json(lesson)
    }

    async delete({ params, response }) {
        const lesson = await Lesson.find(params.id)
        if (!lesson) {
            return response.status(404).json({ data: 'Resource not found' })
        }
        await lesson.delete()

        return response.status(204).json(null)
    }
    async deleteByIdUser({ params, response }) {
        console.log(params)
        const lesson = await Lesson.findBy('id_user', params.id)
        if (!lesson) {
            return response.status(404).json({ data: 'Resource not found' })
        }
        await lesson.delete()

        return response.status(204).json(null)
    }
}

module.exports = LessonController