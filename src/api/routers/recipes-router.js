const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	res.json('Find all Recipes!');
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
