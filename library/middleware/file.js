const multer = require('multer');
const { FILE_BOOKS } = require('../config.js');

const storage = multer.diskStorage({
	destination(req, file, cb) {
		console.log(FILE_BOOKS);
		
		cb(null, FILE_BOOKS);
	},
	filename(req, file, cb) {
		cb(null, `${file.originalname}`);
	},
});

module.exports = multer({storage});
