const db = require('../../configs/db');

async function findAll() {
	let result = await db('recipes');
	return result;
}

module.exports = {
	findAll,
};
