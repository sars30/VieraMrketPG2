const jwt = require('jsonwebtoken')
const { compare_hash } = require('../../helper/hashing')
const obtener_tiempo_jwt = require('../../helper/parameters')
const jsonres = require('../../helper/jsonres')

//EndPoint logueo administradores/usuarios
async function logueo(req, res, pool) {
    try {
        //Se verifica los datos
        const params = req.body
        keys = ["nombre", "contrasena"]
        var des = true
        for (u in keys) {
            if (params[keys[u]] == null || params[keys[u]] === '') {
                des = false
            }
        }
        if (des) {
            const query = `SELECT nombre , contrasena FROM usuario 
            where nombre = '${params[keys[0]]}'`
            //Se efectua la consulta
            const result = await pool.query(query)
            const len = result.recordset.length
            //Se verifica si es un único registro
            if (len == 1) {
                const data = result.recordset
                //Se comparan los hashes
                const nombre = data[0]["nombre"]
                const comprobar_hash = await compare_hash(params[keys[1]],data[0]["contrasena"])
                if(params[keys[0]] == nombre && comprobar_hash ){
                    const contenido = {
                        USER_R: nombre
                    }
                    //Respuesta: Todo OK
                    res.json({
                        "codigo": 200,
                        "mensaje": 'logueo exitoso',
                    })
                }else{
                    //Respuesta: Cuando el proceso de hasheo retorna falso
                    res.json(jsonres(400,"La contraseña no coincide"))
                }
            } else {
                //Respuesta: Cuando no se encuentra el usuario/nombre de red
                res.json(jsonres(400,"Usuario no encontrado"))
            }
        }else{
            //Respuesta: Cuando el usuario envia un formato JSON no valido
            res.json(jsonres(400,"Formato de datos no validos"))
        }
        //Respuesta: Error del sistema
    } catch (e) {
        res.json(jsonres(404,"Error 01"))
    }
}

module.exports = logueo