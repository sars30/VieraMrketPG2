const log_final = require("../../helper/ActivityLogs");
const jsonres = require("../../helper/jsonres");
const jwt_bool = require("../../helper/jwt");

//EndPoint para insertar vendedores
async function insertproducto(req, res, pool) {
  try {
    //Toma los parametros
    const parametros = req.body;
    //VerificarParametros
    const keys = [
      "Nombre",
      "Descripcion",
      "estado",
      "Cedula",
    ];
    //Verificar
    for (const key of keys) {
      //Convertir a mayusculas
      if (
        typeof parametros[key] == "string" 
      ) {
        parametros[key] = parametros[key];
      }
    }

    try {
      const query = `INSERT INTO ${
      process.env.Producto
      } (Nombre, Descripcion,
        estado, Cedula)
        VALUES ('${parametros[keys[0]]}', '${parametros[keys[1]]}', 
        '${parametros[keys[2]]}', '${parametros[keys[3]]}'`;
        //Ejecutar Consulta
        const result = await pool.query(query);
        if (!result.error) {
          //Respuesta OK
          res.json(jsonres(200, "Se ha ingresado con exito"));
        } else {
          res.json(jsonres(404, "Error capturado 01"));
        }
        //Gestión de errores
      } catch (e) {
        res.json(jsonres(404, "Error capturado 02"));
      }
  } catch (e) {
    res.json(jsonres(404, "Error capturado 03"));
  }
}

module.exports = insertproducto;
