const multer = require('multer');
const { FOLDER_BOOKS, FOLDER_IMG } = require('../config.js');

const storage = multer.diskStorage({
	destination(req, file, cb) {
		console.log('file', file);

		if (file.fieldname === 'fileCover') {
			cb(null, FOLDER_IMG);
		} else {
			cb(null, FOLDER_BOOKS);
		}
	},
	filename(req, file, cb) {
		cb(null, `${file.originalname}`);
	},
});

module.exports = multer({ storage: storage });
