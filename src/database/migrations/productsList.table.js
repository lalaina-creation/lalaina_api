/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('productsList', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        return knex('productsList').insert([
            //Pull / Cardigan zippé / Pyjama / Chemise / Caleçon / Pull manches bouffantes / Pull ouvert / Cardigan / Cardigan à poche / Oversize / Crop top / Crop top rallongé / Poncho / Poncho ouvert / Pantalon / Robe / Jupe / Short / Ensembles / Bob / Grenouillère / Echarpe PM / Echarpe MM / Echarpe GM / Echarpe rayée MM / Echarpe rayée GM / Etole / Cape / Gants / Mitaines / Bonnets / Tour de cou
            { title: 'Pull' },
            { title: 'Cardigan zippé' },
            { title: 'Pyjama' },
            { title: 'Chemise' },
            { title: 'Caleçon' },
            { title: 'Pull manches bouffantes' },
            { title: 'Pull ouvert' },
            { title: 'Cardigan' },
            { title: 'Cardigan à poche' },
            { title: 'Oversize' },
            { title: 'Crop top' },
            { title: 'Crop top rallongé' },
            { title: 'Poncho' },
            { title: 'Poncho ouvert' },
            { title: 'Pantalon' },
            { title: 'Robe' },
            { title: 'Jupe' },
            { title: 'Short' },
            { title: 'Ensembles' },
            { title: 'Bob' },
            { title: 'Grenouillère' },
            { title: 'Echarpe PM' },
            { title: 'Echarpe MM' },
            { title: 'Echarpe GM' },
            { title: 'Echarpe rayée MM' },
            { title: 'Echarpe rayée GM' },
            { title: 'Etole' },
            { title: 'Cape' },
            { title: 'Gants' },
            { title: 'Mitaines' },
            { title: 'Bonnets' },
            { title: 'Tour de cou' },
        ]);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('productsList');
};
