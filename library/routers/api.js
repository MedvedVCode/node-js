const express = require('express');
const fs = require('fs');
const router = express.Router();
const fileMulter = require('../middleware/file.js');

const library = require('../storage/storage.js');
const Book = require('../storage/Book.js');
const { DEFAULT_FILE_COVER } = require('../config.js');

router.get('/books', (req, res) => {
	try {
		const { books } = library;
		res.render('api/books/index', {
			title: 'Список книг',
			books: books,
		});
	} catch {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
	// res.json(books);
});

router.get('/books/create', (req, res) => {
	try {
		res.render('api/books/create', {
			title: 'Добавить книгу',
		});
	} catch {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
});

router.get('/books/:id', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json('Потерялась книга');
	}

	try {
		res.render('api/books/view', {
			title: 'О книге',
			book: book,
		});
	} catch {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
	// res.json(book);
});

router.post(
	'/books/create',
	fileMulter.fields([{ name: 'fileCover' }, { name: 'fileBook' }]),
	(req, res) => {
		const { title, description, authors, favorite } = req.body;

		let fileCover = DEFAULT_FILE_COVER;
		let fileName, fileBook;

		if (req.files.fileCover) {
			fileCover = '/' + req.files.fileCover[0].filename;
		}

		if (req.files.fileBook) {
			fileName = req.files.fileBook[0].filename;
			fileBook = req.files.fileBook[0].path;
		}
		try {
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

			res.redirect('/api/books');
		} catch (err) {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
		// res.status(201).json(newBook);
	}
);

router.get('/books/update/:id', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json({ message: 'Книга не найдена' });
	}

	try {
		res.render('api/books/update', {
			title: 'Редактировать книгу',
			book: book,
		});
	} catch {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
});

router.post(
	'/books/update/:id',
	fileMulter.fields([{ name: 'fileCover' }, { name: 'fileBook' }]),
	(req, res) => {
		const book = library.books.find((book) => book.id === req.params.id);
		if (!book) {
			res.status(404).json({ message: 'Книга не найдена' });
		}
		try {
			const { title, description, authors, favorite } = req.body;
			if (title) book.title = title;
			if (description) book.description = description;
			if (authors) book.authors = authors;
			book.favorite = Boolean(favorite);

			if (req.files.fileCover) {
				book.fileCover = '/' + req.files.fileCover[0].filename;
			}

			if (req.files.fileBook) {
				book.fileName = req.files.fileBook[0].filename;
				book.fileBook = req.files.fileBook[0].path;
			}

			// res.json(book);
			res.redirect('/api/books/' + book.id);
		} catch {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}
);

router.post('/books/delete/:id', (req, res) => {
	const id = library.books.findIndex((book) => book.id === req.params.id);
	if (id === -1) {
		res.status(404).json({ message: 'Книга не найдена' });
	} else {
		try {
			library.books.splice(id, 1);
			res.redirect('/api/books');
		} catch {
			res.status(500).json({ message: 'Что-то пошло не так' });
		}
	}
});

router.get('/books/:id/download', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json({ message: 'Книга не найдена' });
	}

	try {
		res.download(__dirname + '\\..\\' + book.fileBook);
	} catch {
		res.status(500).json({ message: 'Что-то пошло не так' });
	}
});

module.exports = router;
