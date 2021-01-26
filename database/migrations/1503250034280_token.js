"use strict";

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema");

//Clase para la migración de Tokens. Esta se crea por defecto en AdonisJs
class TokensSchema extends Schema {
  //Esta función UP se ejecuta cuando se invoca la función de migración:
  // adonis migration:run
  up() {
    this.create("tokens", table => {
      table.increments();
      table
        .integer("user_id")
        .unsigned()
        .references("id")
        .inTable("users");
      table
        .string("token", 255)
        .notNullable()
        .unique()
        .index();
      table.string("type", 80).notNullable();
      table.boolean("is_revoked").defaultTo(false);
      table.timestamps();
    });
  }
  //Esta función DOWN se ejecuta cuando se realiza un rollback (retroceso)
  // adonis migration:rollback
  down() {
    this.drop("tokens");
  }
}

module.exports = TokensSchema;
