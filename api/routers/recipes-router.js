// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Recipes = require('../models/recipes-model.js');

// Middlewares
const {
	validateBody,
	validateBodyForRecipeUpdate,
	deleteRecipeIfExists,
} = require('../middleware/recipes-middleware.js');
const restricted = require('../middleware/restricted');

router.get('/', restricted, (req, res) => {
	Recipes.findAll().then((recipes) => {
		res.status(200).json(recipes);
	});
});

router.get('/:id', restricted, (req, res) => {
	const { id } = req.params;
	Recipes.findById(id)
		.then((recipe) => {
			if (recipe.length > 0) {
				res.status(200).json(recipe);
			} else {
				res.status(404).json({ message: "That Recipe doesn't exist!" });
			}
		})
		.catch(() => res.status(500).json({ message: 'Internal Server Error' }));
});

router.post('/', restricted, validateBody, (req, res) => {
	Recipes.newRecipe(req.recipe)
		.then((recipe) => {
			res.status(201).json(recipe);
		})
		.catch((err) => res.status(500).json({ error: err }));
});

router.put('/:id', restricted, validateBodyForRecipeUpdate, (req, res) => {
	res.status(200).json(req.updatedRecipe);
});

router.delete('/:id', restricted, deleteRecipeIfExists, (req, res) => {
	res.status(200).json(req.deletedRecipe);
});

module.exports = router;
