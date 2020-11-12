//bien vamos a comenzar de nuevo con la parte de los las peticiones y los servicios api asi que vamos 
//a darle caña


//vamos a definir el nombre de los metodos de express
const { Router, response} = require('express');
const { check } = require('express-validator');

const { apiUsuario, login, renewToken } = require('../controllers/auth');

const { validarCampos} = require('../middlewares/validar-campo');

const { validarJWT} = require('../middlewares/validar-JWT');

const rutas = Router();

//vamos a construir la peticion del post

//vamos a hacer una validacion para ver que efectivamente en la parte del request todo este bien

rutas.post('/api1',[
    //aqui van nuestras validaciones de la parte del request
    //validacion de email
    check('email','el dato del email es requerido').isEmail(),
    //validacion de usuario
    check('nombre', 'el dato de usuario es requerido').not().isEmpty(),
    check('password', 'el dato de password es requerido').not().isEmpty(),
    validarCampos
],apiUsuario);

//vamos a crear las validaciones para acceder al login vamos a darle

rutas.post('/', [
    //vamos a poner lo que vamos a mandar a la solicitud y verificar que este correcto
    check('email', 'el dato del email es requerido').isEmail(),
    check('nombre', 'el dato del usuario es requerido').not().isEmpty(),
], 
login)


//ahora vamos a hacer la peticion get para que validemos el token

rutas.get('/renew', validarJWT, renewToken);

module.exports= rutas;