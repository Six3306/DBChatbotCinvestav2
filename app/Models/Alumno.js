'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Alumno extends Model {
    static get table () {
        return 'alumnos'
      }

      static get primaryKey () {
        return 'id'
      }
}

module.exports = Alumno
