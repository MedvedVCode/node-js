const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
	try {
		res.render('index', {
			title: 'Главная',
		});
	} catch {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
});

module.exports = router;
