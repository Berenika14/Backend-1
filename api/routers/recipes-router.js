// Dependencies
const express = require('express');
const router = express.Router();

// Models
const Recipes = require('../models/recipes-model.js');

router.get('/', (req, res) => {
	Recipes.findAll().then((recipes) => {
		res.status(200).json(recipes);
	});
});

router.get('/:id', (req, res) => {
	res.json('Find specific Recipe!');
});

router.post('/', (req, res) => {
	res.json('Post new Recipe!');
});

router.put('/:id', (req, res) => {
	res.json('Update existing Recipe!');
});

router.delete('/:id', (req, res) => {
	res.json('Delete existing Recipe!');
});

module.exports = router;
