/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('mattersList', function (table) {
        table.increments('id').primary();
        table.string('matter_title', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        return knex('mattersList').insert([
            // Cachemire / Coton / Velours / Laine / Lin
            { matter_title: 'Cachemire' },
            { matter_title: 'Coton' },
            { matter_title: 'Velours' },
            { matter_title: 'Laine' },
            { matter_title: 'Lin' },
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('mattersList');
};
 