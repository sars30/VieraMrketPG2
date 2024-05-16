const log_final = require("../../helper/ActivityLogs");
const jsonres = require("../../helper/jsonres");
const jwt_bool = require("../../helper/jwt");

//EndPoint para modificar vendedores
async function ModifyLote(req, res, pool) {
  try {
    //Toma los parametros
    const parametros = req.body;
    //VerificarParametros
    var des = true;
    const keys = [
      "Fecha_ingreso",
      "Fecha_fabri",
      "Fecha_venc",
      "Unidades",
      "Descripcion",
      "estado",
      "Id_Producto",
      "Id_Proveedor",
    ];
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
          const query_sub = `Select * from ${process.env.TABLA_PRINCIPAL} where 
          Descrip_Lote = '${parametros[keys[4]]}'`;
          const result_search = await pool.query(query_sub);
          const cuerpo = result_search.recordset;
          if (cuerpo.length == 1) {
            const query = `UPDATE ${process.env.TABLA_PRINCIPAL} 
            SET 
                Fecha_ingreso = '${parametros[keys[0]]}'
              , Fecha_fabri = '${parametros[keys[1]]}'
              , Fecha_venc = '${parametros[keys[2]]}'
              , Unidades = '${parametros[keys[3]]}'
              , Descripcion = '${parametros[keys[4]]}'
              , estado = '${parametros[keys[5]]}'
              , Id_Producto = '${parametros[keys[6]]}'
              , Id_Proveedor = '${parametros[keys[7]]}'
            WHERE Descrip_Lote = '${parametros[keys[4]]}'`;
            //Ejecutar Consulta
            const result = await pool.query(query);
            if (!result.error) {
              try {
                //Se insertan los logs
                let user_red_token = des_jwt["user_red_jwt"];
                await log_final(
                  pool,
                  parametros,
                  "Moficar lote( " + cuerpo[0]["Descripcion"] + ")",
                  user_red_token
                );
              } catch (errorlog) {
                console.log("Error en la inserción del log: " + errorlog);
              }
              //Respuesta OK
              res.json(
                jsonres(
                  200,
                  "Se ha actualizado " + cuerpo[0]["Descripcion"]
                )
              );
            } else {
              res.json(jsonres(404, "Error capturado 01"));
            }
          } else {
            res.json(jsonres(400, "Lote no encontrado"));
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

module.exports = ModifyLote;
