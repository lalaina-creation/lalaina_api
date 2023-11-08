/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */


// ex: npx knex migrate:make create_tickets_table --knexfile /full/path/to/knexfile.js

exports.up = function(knex) {
    return knex.schema.createTable('products', function (table) {
        table.increments('id').primary();
        table.string('title', 255).notNullable(); //Pull / Cardigan zippé / Pyjama / Chemise / Caleçon / Pull manches bouffantes / Pull ouvert / Cardigan / Cardigan à poche / Oversize / Crop top / Crop top rallongé / Poncho / Poncho ouvert / Pantalon / Robe / Jupe / Short / Ensembles / Bob / Grenouillère / Echarpe PM / Echarpe MM / Echarpe GM / Echarpe rayée MM / Echarpe rayée GM / Etole / Cape / Gants / Mitaines / Bonnets / Tour de cou
        table.text('description').nullable();
        table.decimal('price', 10, 2).notNullable(); 
        table.string('image_url', 255).notNullable();

        table.string('category').notNullable(); // Hommes / Femmes / Enfants / Accessoires
        table.string('matter', 255).notNullable(); //Cachemire / Coton / Velours / Laine / Lin
        table.string('col', 255).notNullable(); // V / Rond / Roulé / Carré / Camioneur / à Boutons / Cheminé
        table.string('threads', 255).notNullable(); // 2 fils / 3 fils / 4 fils

        table.string('size', 255).nullable(); //XS / S / M / L / XL / XXL / XXXL / TU
        table.string('color', 255).nullable(); // Noir / Blanc / Jaune / Vert clair / Vert foncé / Kaki / Mauve / Violet / Rouge / Bordeau / Bleu clair / Bleu foncé / Orange / Camel / Rose
        
        table.integer('stock_quantity').nullable().defaultTo(1);
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
