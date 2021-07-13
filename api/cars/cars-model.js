const db = require('../../data/db-config');

const getAll = async () => {
  return await db('cars');
}

const getById = async (id) => {
  return await db('cars')
    .where( { id })
    .first();
}

const getByVin = async (vin) => {
  return await db('cars')
    .where( { vin })
    .first();
}

const create = async (neoCar) => {
  neoCar.id = Date.now();
  
  return await db('cars')
    .insert(neoCar);
}

module.exports = {
  getAll,
  getById,
  getByVin,
  create
}