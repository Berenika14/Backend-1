const Recipes = require('../models/recipes-model');

function validateBody(req, res, next) {
	const { title, source, category, instructions, user_id } = req.body;

	if (!title || !source || !category || !instructions || !user_id) {
		res.status(400).json({ message: 'All Fields Are Required' });
	} else {
		req.recipe = req.body;
		next();
	}
}

function validateBodyForRecipeUpdate(req, res, next) {
	const { id } = req.params;
	const { title, source, category, instructions } = req.body;

	if (!title || !source || !category || !instructions) {
		res.status(400).json({ message: 'All Fields Are Required' });
	} else {
		Recipes.findById(id)
			.then((recipe) => {
				Recipes.updateRecipe(recipe[0].recipe_id, req.body)
					.then((updatedRecipe) => {
						req.updatedRecipe = updatedRecipe;
						next();
					})
					.catch(() => res.json({ message: 'Internal Server Error' }));
			})
			.catch(() => {
				res.status(404).json({ message: "That Recipe Doesn't Exist" });
			});
	}
}

function deleteRecipeIfExists(req, res, next) {
	const { id } = req.params;
	Recipes.findById(id).then((recipe) => {
		if (recipe.length > 0) {
			Recipes.deleteRecipe(id)
				.then((deletedRecipe) => {
					req.deletedRecipe = deletedRecipe;
					next();
				})
				.catch(() => {
					res.status(500).json({ message: 'Internal Server Error' });
				});
		} else {
			res.status(404).json({ message: "That Recipe Doesn't Exist" });
		}
	});
}

module.exports = {
	validateBody,
	validateBodyForRecipeUpdate,
	deleteRecipeIfExists,
};
