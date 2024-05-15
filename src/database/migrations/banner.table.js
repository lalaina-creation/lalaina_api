/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('banner', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.string('image', 255).notNullable();
        table.string('description', 255).nullable();
        table.timestamps(true, true);
    })
    .then(() => {
        return knex('banner').insert([
            { title: 'Default Banner', image: 'https://img.freepik.com/premium-vector/white-christmas-background-festive-web-template-vector_532963-885.jpg?w=2000', description: 'Default Banner Description' },
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('banner');
};
 