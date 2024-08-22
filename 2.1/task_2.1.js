const express = require('express');
const { v4: uuid } = require('uuid');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());

class Book {
	constructor(
		title = '',
		description = '',
		authors = '',
		favorite = '',
		fileCover = '',
		fileName = ''
	) {
		this.id = uuid();
		this.title = title;
		this.description = description;
		this.authors = authors;
		this.favorite = favorite;
		this.fileCover = fileCover;
		this.fileName = fileName;
	}
}

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

app.post('/api/user/login', (req, res) => {
	res.status(201).json({ id: 1, mail: 'test@mail.ru' });
});

app.get('/api/books', (req, res) => {
	const { books } = library;
	res.json(books);
});

app.get('/api/books/:id', (req, res) => {
	const book = library.books.find((book) => book.id === req.params.id);

	if (!book) {
		return res.status(404).json({ message: 'Книга не найдена' });
	}

	res.json(book);
});

app.post('/api/books', (req, res) => {
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

app.put('/api/books/:id', (req, res) => {
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

app.delete('/api/books/:id', (req, res) => {
	const id = library.books.findIndex((book) => book.id === req.params.id);
	if (id === -1) {
		res.status(404).json({ message: 'Книга не найдена' });
	} else {
		library.books.splice(id, 1);
		res.json('ok');
	}
});

app.listen(port, () => {
	console.log('Сервер запущен на порту ', port);
});
