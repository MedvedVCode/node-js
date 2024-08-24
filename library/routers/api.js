const express = require('express');
const fs = require('fs');
const router = express.Router();
const fileMulter = require('../middleware/file.js');

const library = require('../storage/storage.js');
const Book = require('../storage/Book.js');

router.get('/books', (req, res) => {
	const { books } = library;
	res.json(books);
});

router.get('/books/:id', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json({ message: 'Книга не найдена' });
	}

	res.json(book);
});

router.post('/books', fileMulter.single('fileBook'), (req, res) => {
	console.log(req.file, req.body);

	const { title, description, authors, favorite, fileCover } = req.body;

	const fileName = req.file.filename;
	const fileBook = req.file.path;

	const newBook = new Book(
		title,
		description,
		authors,
		Boolean(favorite),
		fileCover,
		fileName,
		fileBook
	);

	library.books.push(newBook);
	res.status(201).json(newBook);
});

router.put('/books/:id', fileMulter.single('fileBook'), (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);
	if (!book) {
		res.status(404).json({ message: 'Книга не найдена' });
	} else {
		const { title, description, authors, favorite, fileCover } = req.body;

		if (title) book.title = title;
		if (description) book.description = description;
		if (authors) book.authors = authors;
		if (favorite) book.favorite = Boolean(favorite);
		if (fileCover) book.fileCover = fileCover;

		if (req.file) {
			book.fileName = req.file.filename;
			book.fileBook = req.file.path;
		}

		res.json(book);
	}
});

router.delete('/books/:id', (req, res) => {
	const id = library.books.findIndex((book) => book.id === req.params.id);
	if (id === -1) {
		res.status(404).json({ message: 'Книга не найдена' });
	} else {
		// Если надо удалить книгу с диска физически
		// const fileBook = library.books[id].fileBook;
		// fs.unlink(__dirname + '\\..\\' + fileBook, (err) => {
		// 	if (err) {
		// 		console.error('Ошибка удаления файла', err);
		// 	}
		// });

		library.books.splice(id, 1);

		res.json('ok');
	}
});

router.get('/books/:id/download', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json({ message: 'Книга не найдена' });
	}

	res.download(__dirname + '\\..\\' + book.fileBook);
});

module.exports = router;
