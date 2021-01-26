"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//Clase para la migración de Lessons (Lecciones)
class LessonsSchema extends Schema {
  //Esta función UP se ejecuta cuando se invoca la función de migración:
  // adonis migration:run
  up() {
    this.create("lessons", table => {
      table.increments();
      table
        .integer("id_user")
        .unsigned()
        .references("id")
        .inTable("users")
        .unique();
      table.string("grade").notNullable();
      table.string("group").notNullable();
      table.boolean("deleted").defaultTo(0);
      table.timestamps();
    });
  }
  //Esta función DOWN se ejecuta cuando se realiza un rollback (retroceso)
  // adonis migration:rollback
  down() {
    this.drop("lessons");
  }
}

module.exports = LessonsSchema;
