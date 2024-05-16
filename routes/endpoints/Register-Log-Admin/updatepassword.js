const log_final = require("../../helper/ActivityLogs");
const { hashing } = require("../../helper/hashing");
const jwt_bool = require("../../helper/jwt");
const jsonres = require('../../helper/jsonres')

async function updatepassword(req, res, pool) {
  try {
    //Se obtienen los parametros
    const parametros = req.body;
    const keys = ["Correo_Usuario", "token", "contranueva"];
    var des = true;
    for (const key of keys) {
      if (parametros[key] == null || parametros[key] === "") {
        des = false;
      }
    }
    //VerificarParametros
    if (des) {
      const jws_data = await jwt_bool(parametros[keys[1]]);
      // Se verifica el Json
      if (jws_data["estado"]) {
        const query = `SELECT * FROM ${
          process.env.TABLA_ADMIN
        } where Correo_Usuario = '${parametros[keys[0]]}' `;
        const result = await pool.query(query);
        const objresult = result.recordset;
        //Se debe encontrar el resultado
        if (objresult.length == 1) {
          //Se verifica si el nombre ingresado es igual al nombre dentro del JWT
          if (jws_data["user_red_jwt"] == objresult[0]["Correo_Usuario"]) {
            //Se hashea la contraseña
            const hashpass = await hashing(parametros[keys[2]]);
            //Se ejecuta la consulta (Actualiza el registro)
            const query2 = `UPDATE ${process.env.TABLA_ADMIN}
                        set contrasena = '${hashpass}',
                        contra_cambiar = 1
                        where Correo_Usuario = '${jws_data["user_red_jwt"]}' `;
            const result2 = await pool.query(query2);
            if (!result2.error) {
              //Se registra en la tabla "log"
              await log_final(pool, parametros , "Actualización de credenciales (Admin)" ,jws_data["user_red_jwt"] )
              res.json(jsonres(200,"Se ha actualizado la contraseña"))
            } else {
              res.json(jsonres(400,"Error 01"))
            }
          } else {
            res.json(jsonres(400,"Token no valido con el usuario"))
          }
        } else {
          res.json(jsonres(400,"No se encontro el usuario"))
        }
      } else {
        res.json(jsonres(400,"Token no valido"))
      }
    } else {
      res.json(jsonres(404,"Error 02"))
    }
  } catch (e) {
    res.json(jsonres(404,"Error 03"))
  }
}

module.exports = updatepassword;
