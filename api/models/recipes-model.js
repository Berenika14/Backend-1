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

async function updateRecipe(id, body) {
	let result = await db('recipes')
		.where('recipe_id', id)
		.update({
			title: body.title,
			source: body.source,
			category: body.category,
			instructions: body.instructions,
		})
		.returning('*');

	return result[0];
}

async function deleteRecipe(id) {
	let result = await db('recipes').where('recipe_id', id).del().returning('*');
	return result[0];
}

module.exports = {
	findAll,
	findById,
	newRecipe,
	updateRecipe,
	deleteRecipe,
};
