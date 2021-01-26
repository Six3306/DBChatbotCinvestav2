"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//Clase para la migración de Usuario
class UserSchema extends Schema {
  //Esta función UP se ejecuta cuando se invoca la función de migración:
  // adonis migration:run
  up() {
    this.create("users", table => {
      table.increments();
      table.string("username", 80).notNullable();
      table
        .string("email", 254)
        .notNullable()
        .unique();
      table.string("password", 60).notNullable();
      table.integer("age").notNullable();
      table.string("type").notNullable();

      //10.02.2020
      //Se editó esta parte para evitar el error cuando se agrega al usuario administrador en postman
      //El error era que se no estaba definiendo por defecto los valores y con eso se soluciona
      // table.boolean("activated").notNullable();

      table
        .boolean("activated")
        .notNullable()
        .defaultTo(0);

      table.boolean("deleted").defaultTo(0);
      table.timestamps();
    });
  }

  //Esta función DOWN se ejecuta cuando se realiza un rollback (retroceso)
  // adonis migration:rollback
  down() {
    this.drop("users");
  }
}

module.exports = UserSchema;
