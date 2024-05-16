const log_final = require("../../helper/ActivityLogs");
const jsonres = require("../../helper/jsonres");
const jwt_bool = require("../../helper/jwt");

//EndPoint para actualizar usuario
async function loteUpdate(req, res, pool) {
  try {
    const parametros = req.body;
    const keys = ["Descrip_Lote", "token"];
    const des_jwt = await jwt_bool(parametros[keys[4]]);
    //Verificacion del JWT
    if (des_jwt["estado"]) {
      //Busca si existe
      const query_search = `SELECT * FROM ${process.env.TABLA_PRINCIPAL} WHERE
      Descrip_Lote = '${parametros[keys[4]]}'`;
      const result = await pool.query(query_search);
      const tam = result.recordset.length;
      if (!result.error) {
        //Encuentra registro(s) y valida que solamente sea uno
        if (tam == 1) {
          const obj = result.recordset;
          var query_update;
          var esta_actual;
          /*Se modifica la query dependiendo si esta activo 
          Si esta activo , se deshabilita (1 --> 0)
          Si esta deshabilitado , se activa (0 --> 1)
          */
          if (obj[0]["Activo"] == 1) {
            query_update = `UPDATE ${process.env.TABLA_PRINCIPAL}    
                        SET ACTIVO = 0
                        WHERE Descrip_Lote = '${parametros[keys[4]]}' `;
            esta_actual = "inactivo";
          } else if (obj[0]["Activo"] == 0) {
            query_update = `UPDATE ${process.env.TABLA_PRINCIPAL}    
                        SET ACTIVO = 1
                        WHERE Descrip_Lote = '${parametros[keys[4]]}' `;
            esta_actual = "activo";
          }
          const result_update = await pool.query(query_update);
          if (!result_update.error) {
            //Se registra el log
            let user_red_token = des_jwt["user_red_jwt"]      
            await log_final(pool, parametros, "ActualizarEstado", user_red_token);
            //TODO OK
            res.json({
              codigo: 200,
              mensaje: "Se ha modificado exitosamente el registro",
              estado_actual: esta_actual,
            });
          } else {
            //Error 01
            res.json(jsonres(404,"Error 01"));
          }
        } else if (tam > 1 || tam < 1) {
          //Si se encuentran dos registros
          res.json(jsonres(400,"Registro no valido"));
        }
      } else {
        //Error 02
        res.json(jsonres(404,"Error 02"));
      }
    } else {
      //Token no valido
      res.json(jsonres(400,"Token no valido"));
    }
  } catch (e) {
    //Error 03
    res.json(jsonres(404,"Error 03"));
  }
}

module.exports = loteUpdate;
