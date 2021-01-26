'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Score extends Model {
    static get table() {
        return 'scores'
    }

    static get primaryKey() {
        return 'id'
    }
}

module.exports = Score