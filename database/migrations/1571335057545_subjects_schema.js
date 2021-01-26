"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//Clase para la migración de Subjects (Materias)
class SubjectsSchema extends Schema {
    //Esta función UP se ejecuta cuando se invoca la función de migración:
    // adonis migration:run
    up() {
            this.create("subjects", table => {
                table.increments();
                table.string("name").notNullable();
                table.string("grade").notNullable();
                table
                    .integer("profesor_id")
                    .unsigned()
                    .references("id")
                    .inTable("users");
                table.boolean("deleted").defaultTo(0);
                table.timestamps();
            });
        }
        //Esta función DOWN se ejecuta cuando se realiza un rollback (retroceso)
        // adonis migration:rollback
    down() {
        this.drop("subjects");
    }
}

module.exports = SubjectsSchema;