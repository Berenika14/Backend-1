// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Recipes = require('../models/recipes-model.js');

// Middlewares
const { validateBody } = require('../middleware/recipes-middleware.js');

router.get('/', (req, res) => {
	Recipes.findAll().then((recipes) => {
		res.status(200).json(recipes);
	});
});

router.get('/:id', (req, res) => {
	const { id } = req.params;
	Recipes.findById(id)
		.then((recipe) => {
			if (recipe.length > 0) {
				res.status(200).json(recipe);
			} else {
				res.status(404).json({ message: "That Recipe doesn't exist!" });
			}
		})
		.catch((err) => res.status(500).json({ error: err }));
});

router.post('/', validateBody, (req, res) => {
	res.json('Create new Recipe!');
});

router.put('/:id', (req, res) => {
	res.json('Update existing Recipe!');
});

router.delete('/:id', (req, res) => {
	res.json('Delete existing Recipe!');
});

module.exports = router;
