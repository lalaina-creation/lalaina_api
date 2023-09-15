/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.text('description', 255).nullable();
        table.string('price', 255).notNullable();
        table.string('image', 255).notNullable();
        table.string('category', 255).nullable();
        // table.string('colors', 255).notNullable();
        // table.string('sizes', 255).notNullable();
        table.timestamps(true, true);
      });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('products');
};
