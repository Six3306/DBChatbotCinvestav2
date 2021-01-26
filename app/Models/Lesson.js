'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Lesson extends Model {
    static get table () {
        return 'lessons'
    }

    static get primaryKey () {
        return 'id'
    }
}

module.exports = Lesson
