const multer = require("multer"); //Gerencia Arquivos de Upload
const path = require("path"); //Lib para resolver caminhos - Path
const crypto = require("crypto"); //Crypto gera um hash

module.exports = {
	dest: path.resolve(__dirname, '..', '..', 'tmp'),
	storage: multer.diskStorage({
		destination: (req, file, callback) => {
			callback(null, path.resolve(__dirname, '..', '..', 'tmp'))
		},
		filename: (req, file, callback) => {
			crypto.randomBytes(16, (err, hash) => {
				if (err) callback(err);

				file.key = `${hash.toString('hex')}-${file.originalname}`;

				callback(null, file.key);
			});
		}
	})
};