const file = require('multer')
require('dotenv').config();


const storage = file.diskStorage({
	destination(req, file,cb){
		cb(null, process.env.FILE_BOOKS)
	},
	filename(req, file,cb){
		cb(null, file.originalname)
	}
})

module.exports = storage