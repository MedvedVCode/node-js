const Book = require('./Book.js');
const library = {
	books: [
		new Book(
			'Война и мир',
			'почти не скучная',
			'Толстой Л.Н.',
			true,
			'/war-and-piece.jpg',
			'war-and-piece.txt',
			'storage\\books\\war-and-piece.txt'
		),
		new Book(
			'Преступление и наказание',
			'о бедном студенте замолвите слово',
			'Достоевский Ф.М.',
			false,
			'/crime-and-punishment.jpeg',
			'crime-and-punishment.txt',
			'storage\\books\\crime-and-punishment.txt'
		),
	],
};

module.exports = library;
