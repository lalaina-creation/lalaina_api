/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.text('description').nullable();
        table.decimal('price', 10, 2).notNullable(); // Assuming prices can have two decimal places
        table.string('image_url', 255).notNullable();
        table.string('category').nullable();
        // table.foreign('category_id').references('id').inTable('categories');
        table.string('attributes', 255).notNullable();
        table.string('gender', 255).nullable(); // Hommes / Femmes / Garçons / Filles / Tous
        table.string('sizes', 255).nullable();
        // table.integer('stock_quantity').notNullable();
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
