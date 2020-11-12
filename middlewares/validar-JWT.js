const { response } = require('express');
const jwt = require('jsonwebtoken');


const validarJWT = (req, res= response, next) => {

    const token = req.header('x-token');

    //vamos a validar primero si recibimos un token
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'no hay token en la peticion'
        })
    }

    try{
        const { uid } = jwt.verify( token, process.env.JWT_KEY );
        req.uid = uid;

        next();
    }catch(error){
        return res.status(401).json({
            ok: false,
            msg: 'token no valido'
        })
    }
}


module.exports = {
    validarJWT
}