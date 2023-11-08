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
            { email: 'lalaina_creation@gmail.com', password: '$2y$10$VfqlASyKaZO7eNzC9pjws.3eS8fJ1ALVX0f6M/Zd1L6hEaTlzrJwe' },
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
 