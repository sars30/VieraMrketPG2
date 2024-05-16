const log_final = require("../../helper/ActivityLogs");
const jsonres = require("../../helper/jsonres");
const jwt_bool = require("../../helper/jwt");

//EndPoint para insertar vendedores
async function insertRol(req, res, pool) {
  try {
    //Toma los parametros
    const parametros = req.body;
    //VerificarParametros
    var des = true;
    const keys = [
      "Id_Rol",
      "Nom_rol",
      "estado",
    ];
    //Verificar
    for (const key of keys) {
      if (parametros[key] == null || parametros[key] === "") {
        des = false;
        break;
      }
      //Convertir a mayusculas
      if (
        typeof parametros[key] == "string" &&
        key != "token"
      ) {
        parametros[key] = parametros[key].toUpperCase();
      }
    }

    //Verificación de jwt
    const des_jwt = await jwt_bool(parametros[keys[6]]);
    if (des_jwt["estado"]) {
      //Condicional que verifica que todos los datos se enviaron con éxito
      if (des) {
        try {
          const query = `INSERT INTO ${
            process.env.TABLA_PRINCIPAL
          } (Id_Rol, Nom_rol, estado)
          VALUES ('${parametros[keys[0]]}', '${parametros[keys[1]]}', '${parametros[keys[2]]}'`;
          //Ejecutar Consulta
          const result = await pool.query(query);
          if (!result.error) {
            try {
              //Se insertan los logs
              let user_red_token = des_jwt["user_red_jwt"];
              await log_final(
                pool,
                parametros,
                "Insertar Rol",
                user_red_token
              );
            } catch (errorlog) {
              console.log("Error en la inserción del log: " + errorlog);
            }
            //Respuesta OK
            res.json(jsonres(200, "Se ha ingresado con exito"));
          } else {
            res.json(jsonres(404, "Error capturado 01"));
          }
          //Gestión de errores
        } catch (e) {
          res.json(jsonres(404, "Error capturado 02"));
        }
      } else {
        res.json(jsonres(400, "Datos incompletos"));
      }
    } else {
      res.json(jsonres(400, "Token no valido"));
    }
  } catch (e) {
    res.json(jsonres(404, "Error capturado 03"));
  }
}

module.exports = insertRol;
