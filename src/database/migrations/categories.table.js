/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('categories', function (table) {
        table.increments('id').primary();
        table.string('category_name', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        // Inserting categories
        return knex('categories').insert([
            { category_name: 'Cachemire' },
            { category_name: 'Pyjamas' },
            { category_name: 'Chemise' },
            { category_name: 'Pantalon'},
            { category_name: 'Salopette'},
            { category_name: 'Robe'},
            { category_name: 'Short'},
            { category_name: 'Bloomer'},

        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('categories');
};
 