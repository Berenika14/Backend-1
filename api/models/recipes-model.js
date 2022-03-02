const db = require('../../configs/db');

async function findAll() {
	let result = await db('recipes');
	return result;
}

async function findById(id) {
	let result = await db('recipes').where('recipe_id', id);
	return result;
}

async function newRecipe(body) {
	let insert = await db('recipes').insert(body);
	let result = await findById(insert);
	return result;
}

module.exports = {
	findAll,
	findById,
	newRecipe,
};
