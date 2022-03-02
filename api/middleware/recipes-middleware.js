function validateBody(req, res, next) {
	const { title, source, category, instructions, user_id } = req.body;

	if (!title || !source || !category || !instructions || !user_id) {
		res.status(400).json({ message: 'All Fields Are Required' });
	} else {
		req.recipe = req.body;
		next();
	}
}

module.exports = {
	validateBody,
};
