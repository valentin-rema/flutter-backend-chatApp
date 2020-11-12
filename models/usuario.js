const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    //vamos a definir los campos que va a tener cada uno de los usuarios
    nombre:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,

    },
    online: {
        type: Boolean,  
        default: false
    }
});


//ahora vamos a definir un metodo donde solo vamos a editar los datos que nos convenga mostrar

UsuarioSchema.method('toJSON', function() {
    const { __v, _id, online, ...object } = this.toObject();
    object.uid = _id;
    return object;
})

module.exports = model('Usuario', UsuarioSchema);

 