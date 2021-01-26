'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

//esquema para definir la tabla de scores que servira para almacenar las calificaciones de los alumnos
class ScoresSchema extends Schema {
    //Esta función UP se ejecuta cuando se invoca la función de migración:
    // adonis migration:run
    up() {
            this.create("scores", table => {
                table.increments();
                table.integer("user_id")
                    .unsigned()
                    .references("id")
                    .inTable("users");
                table.integer("subject_id")
                    .unsigned()
                    .references("id")
                    .inTable("subjects");
                table.integer("bi1");
                table.integer("bi2");
                table.integer("bi3");
                table.integer("bi4");
                table.integer("bi5");
                table.boolean("deleted").defaultTo(0);
                table.timestamps();
            });
        }
        //Esta función DOWN se ejecuta cuando se realiza un rollback (retroceso)
        // adonis migration:rollback
    down() {
        this.drop("scores");
    }
}

module.exports = ScoresSchema