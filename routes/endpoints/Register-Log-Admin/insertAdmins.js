const jwt = require('jsonwebtoken')
const log_final = require('../../helper/ActivityLogs')
const bcrypt = require('bcrypt');
const { hashing } = require('../../helper/hashing');
const obtener_tiempo_jwt = require('../../helper/parameters');
const jsonres = require('../../helper/jsonres')

//EndPoint Insertar Administradores-usuarios frente vendedores plaza morada
async function insertUsuario(req, res, pool) {
    try {
        //Se verifica los datos
        const params = req.body
        const keys = ["Cc_Usuario", "Nom_Usuario" , "Apell_Usuario", "Fecha_Nac_Usuario", "Dir_Usuario", "Correo_Usuario", "contrsena"]
        var des = true
        for (u in keys) {
            if (params[keys[u]] == null || params[keys[u]] === '') {
                des = false
            }
        }
        //Se ejecuta la consulta si todo esta en orden
        if (des) {
            try {
                //Se hashea la contraseña
                const contrasena_hasheada =  await hashing(params[keys[3]])
                //Se verifica si la contraseña devuelve un valor
                if(contrasena_hasheada != "" && contrasena_hasheada != null){
                    //Se inserta el usuario a la tabla
                    const query = `INSERT INTO ${process.env.TABLA_ADMIN} 
                    (Cc_Usuario, Nom_Usuario , Apell_Usuario, Fecha_Nac_Usuario, Dir_Usuario, Correo_Usuario, contrsena) VALUES('${params[keys[0]]}',
                    '${params[keys[1]]}','${params[keys[2]]}','${contrasena_hasheada}','${params[keys[4]]}', '${params[keys[5]]}', '${params[keys[6]]}')`
                    //Se ejecuta la Query
                    const resultado  = await pool.query(query)
                    if(!resultado.error){
                        const red_user = params[keys[1]]
                        const contenido = {
                            USER_R: red_user,
                            ROL: params[keys[4]]
                        }
                        try{
                        //Se genera el log
                        await log_final(pool, params, "Registro y control", red_user);
                        //Se genera el JWT
                        const time = await obtener_tiempo_jwt(pool)
                        const token = jwt.sign(contenido, process.env.JWTPASS, { expiresIn: `${time}` });
                        //Respuesta Afirmativa
                        res.json(jsonres(200,token))
                        }catch(e){
                            console.log(e)
                        }
                    }else{
                        res.json(jsonres(404,"Error 01"))
                    }
                }else{
                    res.json(jsonres(400,"No se pudo hashear la contraseña"))
                }
            } catch (e) {
                res.json(jsonres(404,"Error 02"))
            }
        } else {
            res.json(jsonres(400,"Error de codificación de parámetros"))
        }
    } catch (e) {
        res.json(jsonres(404,"Error 03"))
    }
}

module.exports = insertUsuario