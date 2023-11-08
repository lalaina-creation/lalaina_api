/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('colsList', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        return knex('colsList').insert([
            // V / Rond / Roulé / Carré / Camioneur / à Boutons / Cheminé
            { title: 'V' },
            { title: 'Rond' },
            { title: 'Roulé' },
            { title: 'Carré' },
            { title: 'Camioneur' },
            { title: 'à Boutons' },
            { title: 'Cheminé' },
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('colsList');
};
 