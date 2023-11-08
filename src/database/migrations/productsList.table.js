/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('productsList', function (table) {
        table.increments('id').primary();
        table.string('product_title', 255).notNullable();
        table.timestamps(true, true);
    })
    .then(() => {
        return knex('productsList').insert([
            //Pull / Cardigan zippé / Pyjama / Chemise / Caleçon / Pull manches bouffantes / Pull ouvert / Cardigan / Cardigan à poche / Oversize / Crop top / Crop top rallongé / Poncho / Poncho ouvert / Pantalon / Robe / Jupe / Short / Ensembles / Bob / Grenouillère / Echarpe PM / Echarpe MM / Echarpe GM / Echarpe rayée MM / Echarpe rayée GM / Etole / Cape / Gants / Mitaines / Bonnets / Tour de cou
            { product_title: 'Pull' },
            { product_title: 'Cardigan zippé' },
            { product_title: 'Pyjama' },
            { product_title: 'Chemise' },
            { product_title: 'Caleçon' },
            { product_title: 'Pull manches bouffantes' },
            { product_title: 'Pull ouvert' },
            { product_title: 'Cardigan' },
            { product_title: 'Cardigan à poche' },
            { product_title: 'Oversize' },
            { product_title: 'Crop top' },
            { product_title: 'Crop top rallongé' },
            { product_title: 'Poncho' },
            { product_title: 'Poncho ouvert' },
            { product_title: 'Pantalon' },
            { product_title: 'Robe' },
            { product_title: 'Jupe' },
            { product_title: 'Short' },
            { product_title: 'Ensembles' },
            { product_title: 'Bob' },
            { product_title: 'Grenouillère' },
            { product_title: 'Echarpe PM' },
            { product_title: 'Echarpe MM' },
            { product_title: 'Echarpe GM' },
            { product_title: 'Echarpe rayée MM' },
            { product_title: 'Echarpe rayée GM' },
            { product_title: 'Etole' },
            { product_title: 'Cape' },
            { product_title: 'Gants' },
            { product_title: 'Mitaines' },
            { product_title: 'Bonnets' },
            { product_title: 'Tour de cou' },
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
