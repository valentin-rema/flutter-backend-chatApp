//vamos a comenzar otra vez con la parte de la creacion de nuestro servidor de la aplicacion 
//de mensajeria tipo messenger

const moongose = require('mongoose');


const dbConnection = async() => {
    try{
        //vamos a configurar la conexion de nuestro servidor con mongo atlas
        await moongose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Data Base Online');
        
    }catch(error){
        console.log(error);
        throw new Error('No se pudo hacer la conexion a la base de datos contacte con el admin');
    }
};

module.exports = {
    dbConnection
}