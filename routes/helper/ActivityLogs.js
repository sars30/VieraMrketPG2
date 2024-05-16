const get_time = require("./date")

async function log_final(pool, accion , modulo, correo){
    try{
        //Se formatea el TOKEN
        if('token' in accion){
            accion.token = "XXX"
        }
        if('CONTRASENA' in accion){
            accion.CONTRASENA = "XXX"
        }
        //Se convierte el String el JSON
        const consulta_log = JSON.stringify(accion);
        //Se obtiene la fecha
        let fechaactual = get_time()
        //Ejecución consulta
        const query = `INSERT INTO ${process.env.TABLA_ADMINLOG} (CORREO,FECHA,OPERACION,MODULO) 
        VALUES ('${correo}','${fechaactual}','${consulta_log}','${modulo}')`
        const result = await pool.query(query)
        console.log(correo + " Efectuo un cambio en el módulo " + modulo +  " a las " + fechaactual)
    }catch(e){
        console.log(e)
    }

}

module.exports =  log_final