//ahora vamos a definir la parte del controler para tener una mejor distribucion en el codigo y asi no
//tengamos ningun tipo de problema

const { response } = require('express');
//const { validationResult } = require('express-validator');
const Usuario = require('../models/usuario');

//ahora vamos a encriptar las contraseñas para que no se puedan visualizar

const bcryp = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const usuario = require('../models/usuario');

const apiUsuario = async (req, res= response) => {

    //vamos a extraer lo que se encunetra almacenado en el campo de email
    const { email, password } = req.body; //=> almacenamos el valor del email que agregamos en la solicitud
    try{
        //vamos a ver si efectivamente ya existe un email parecido

        const existeEmail = await Usuario.findOne({ email });
        //vamos a poner la condicional de que si si o no fue encontrado el email

        if( existeEmail ){
            return res.json({
                ok: false,
                msg: 'Ya existe una cuenta con ese usuario'
            });
        }
            const usuario = new Usuario( req.body );

            //ahora vamos a cambiar el atributo de la contraseña con el de un cifrado

            const salt = bcryp.genSaltSync();

            usuario.password = bcryp.hashSync( password, salt);


            //bien ahora vamos a guardar los datos a nuestra base de datos de moongose
            await usuario.save();
            
            //vamos a agregar la parte de Json Web Token
            const token = await generarJWT(usuario.id);

            //vamos a poner lo que vamos a devolver
            res.json({
                ok: true,
                usuario,
                token
            });
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }

    //vamos a extraer la informacion que viene en el body de la peticion api
}

const login= async (req, res= response) => {
    //vamos a recibir la solicitud y vamos a respoder despues

    //vamos a entablar comunicacion con nuestra base de datos 

    const {email, password} = req.body;

    try{
        //validando el email
        const usuarioDB = await Usuario.findOne( {email} );
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'email no encontrado'
            });
        }

        //validando el password
        const validarPassword = bcryp.compareSync(password, usuarioDB.password);
        if(!validarPassword){
            return res.status(404).json({
                ok: false,
                msg: 'la constraseña no es valida'
            });
        }

        //ahora vamos a generar el JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            usuario: usuarioDB,
            token
        })

    }catch(error){
        return res.json({
            ok: false,
            msg: 'hable con el administrador'
        });
    }
}

const renewToken = async (req, res= response) =>{ //=> llegamos a esta funcion desde una peticion get
    //vamos a hacer la siguiente actividad de tarea para ver si nos quedo claro

    //vamos a leer el uid es decir que vamos a crear una constante

    //generar un nuevo JWT 

    //obtener el usuario por el uid, con el siguiente metodo Usuario.findById

    const uid = req.uid;

    const token= await generarJWT(uid);

    //tenemos la variable usuario que es para crear un nuevo modelo y la varible Usuario para acceder 
    //a los modelos 

    const usuario = await Usuario.findById(uid);

    res.json({
        ok: true,
        usuario, 
        token
    })
}

module.exports = {
    apiUsuario,
    login,
    renewToken
}