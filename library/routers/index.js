const express = require('express');
const router = express.Router();

const library = require('../storage/storage.js');
const Book = require('../storage/Book.js');

router.get('/books', (req, res) => {
	const { books } = library;
	res.json(books);
})

router.get('/books/:id', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json({ message: 'Книга не найдена' });
	}

	res.json(book);
});

router.post('/books', (req, res) => {
	const { title, description, authors, favorite, fileCover, fileName } =
		req.body;
		const newBook = new Book(
		title,
		description,
		authors,
		favorite,
		fileCover,
		fileName
	);

	library.books.push(newBook);
	res.status(201).json(newBook);
});

router.put('/books/:id', (req, res) => {
	const id = library.books.findIndex((book) => book.id === req.params.id);
	if (id === -1) {
		res.status(404).json({ message: 'Книга не найдена' });
	} else {
		const { title, description, authors, favorite, fileCover, fileName } =
			req.body;

		library.books[id] = {
			...library.books[id],
			title,
			description,
			authors,
			favorite,
			fileCover,
			fileName,
		};

		res.json(library.books[id]);
	}
});

router.delete('/books/:id', (req, res) => {
	const id = library.books.findIndex((book) => book.id === req.params.id);
	if (id === -1) {
		res.status(404).json({ message: 'Книга не найдена' });
	} else {
		library.books.splice(id, 1);
		res.json('ok');
	}
});

module.exports = router