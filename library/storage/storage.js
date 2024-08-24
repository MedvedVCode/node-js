const Book = require('./Book.js');
const library = {
	books: [
		new Book(
			'Война и мир',
			'почти не скучная',
			'Толстой Л.Н.',
			'yes',
			'',
			'war-and-piece.txt',
			'storage\\books\\war-and-piece.txt'
		),
		new Book(
			'Преступление и наказание',
			'о бедном студенте замолвите слово',
			'Достоевский Ф.М.',
			'no',
			'',
			'crime-and-punishment.txt',
			'storage\\books\\crime-and-punishment.txt'
		),
	],
};

module.exports = library;
