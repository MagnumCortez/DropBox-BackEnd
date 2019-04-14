const express = require('express');
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const app = express();

// Todo mundo pode acessar a aplicação
app.use(cors());

//Como socket.io trabalha com protocolo WS, isso é necessário que que possa trabalhar com HTTP
const server = require("http").Server(app);
const io = require("socket.io")(server);

io.on('connection', socket => {
	socket.on('connectRoom', box => {
		socket.join(box);
	})
	console.log("OK");
});

mongoose.connect('mongodb+srv://omnistack:secreta@cluster0-b8lc6.mongodb.net/omnistackDB?retryWrites=true', {
	useNewUrlParser: true 
});

//Middlewate
app.use((req, res, next) => {
	req.io = io;

	return next();
});

app.use(express.json());
app.use(express.urlencoded( { extended : true }));

//Busca os arquivos fisico da pasta tmp
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));

app.use(require('./routes.js'));

server.listen(process.env.PORT || 3333);