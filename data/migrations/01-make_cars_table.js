exports.up = function (knex) {
  return knex.schema.createTable('cars', table => {
    table.bigInteger('id').unsigned();
    table.text('vin', 64).notNullable().index();
    table.text('make', 64).notNullable();
    table.text('model', 64).notNullable();
    table.bigInteger('mileage').unsigned().notNullable();
    table.text('title', 256);
    table.text('transmission', 256);
    table.unique('id');
    table.unique('vin');
})
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists('cars');
};
