const express = require('express');
const path = require('path');
require('dotenv').config();

//vamos a jalar la parte de la inicializacion a la base de datos

require('./database/config').dbConnection();

// App de Express
const app = express();

//primero vamos a declarar el mildware que nos va a servir para la lectura y escritura de los api
app.use( express.json() );


// Node Server
const server = require('http').createServer(app);
module.exports.io = require('socket.io')(server);
require('./sockets/socket');




// Path público
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ) );

//vamos a definir el path de nuestro end point
app.use('/login/service', require('./routes/auth'));


server.listen( process.env.PORT, ( err ) => {

    if ( err ) throw new Error(err);

    console.log('Servidor corriendo en puerto', process.env.PORT );

});


