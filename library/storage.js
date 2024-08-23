const Book = require('./Book.js');
const library = {
	books: [
		new Book('Война и мир', 'почти не скучная', 'Толстой Л.Н.', 'yes'),
		new Book(
			'Преступление и наказание',
			'о бедном студенте замолвите слово',
			'Достоевский Ф.М.',
			'no'
		),
	],
};

module.exports = library