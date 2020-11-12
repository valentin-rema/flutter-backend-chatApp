//bien vamos a empezar de nuevo para ver si se nos quedo claro el ejemplo pero ahora lo que vamos a hacer
//es que vamos a poner la restriccion pero ahora con el campo email
//vamos a darle caña

//const { response } = require("express");
const { validationResult } = require("express-validator")




const validarCampos = (req, res, next) => {

    const errores = validationResult(req);
    
    if(!errores.isEmpty()){
        //entonces hay errores en la solicitud 
        return res.status(400).json({
           ok: false,
           errors: errores.mapped() 
        });
    }
    next();
}

module.exports={
    validarCampos
}