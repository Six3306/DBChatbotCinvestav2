'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Profesor extends Model {
    static get table () {
        return 'profesors'
    }

    static get primaryKey () {
        return 'id'
    }
}

module.exports = Profesor
