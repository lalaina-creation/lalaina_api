/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('attributes', function (table) {
        table.increments('id').primary();
        table.string('attribute_name', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        // Inserting categories
        return knex('attributes').insert([
            { attribute_name: '2fils' },
            { attribute_name: '3fils' },
            { attribute_name: '4fils' },
            { attribute_name: 'Col rond' },
            { attribute_name: 'Col V' },
            { attribute_name: 'Col camionneur' },
            { attribute_name: 'Col roulé' },
            { attribute_name: 'Col cheminé' },
            { attribute_name: 'Cardigan' },
            { attribute_name: 'Cardigan zippé' },
            { attribute_name: 'Oversize' },
            { attribute_name: 'Crop top' },
            { attribute_name: 'Crop top rallongé' },
            { attribute_name: 'Poncho' },
            { attribute_name: 'Pull poncho' },
            { attribute_name: 'Pull large' },
            { attribute_name: 'Echarpe PM' },
            { attribute_name: 'Echarpe MM' },
            { attribute_name: 'Echarpe GM' },

        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('attributes');
};
