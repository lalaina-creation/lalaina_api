/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('users', function (table) {
        table.increments('id').primary();
        table.string('email', 255).unique();
        table.string('password', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        return knex('users').insert([
            { email: 'vlalaina@live.fr', password: '$2b$10$MSFmI6qNtCVjbjPGA6BqZ.hzqRCtvDzrazNbStf2fCtdbOo9ijL0m' },
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('users');
};
 