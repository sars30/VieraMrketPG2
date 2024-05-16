//Librerias
const jsonres = require("../../helper/jsonres");
const jwt_bool = require("../../helper/jwt");

//EndPoint Para consumir vendedores
async function seeLote(req, res, pool) {
  try {
    //Se toma el token por el encabezado
    const params = req.headers["authorization"];
    //Se verifica el parametro
    if (!params || !params.startsWith("Bearer ")) {
      res.json(jsonres(400, "Error en la lectura/Recibimiento del parametro"));
    } else {
      //Se verifica el JWT
      const des = await jwt_bool(params.split(" ")[1]);
      if (des["estado"]) {
        //Se obtienen los objetos
        const query_go = `select pm.Id, pm.Fecha_Ingreso_Lote , pm.Fecha_Fab_Lote , pm.Fecha_Venc_Lote
        ,pm.Unidades_Lote , pm.Descrip_Lote
        from ${process.env.TABLA_PRINCIPAL} as pm
        inner join  ${process.env.TABLA_COBERTURA} as cb on cb.id =  pm.cobertura_fk
        inner join ${process.env.TABLA_CATEGORIAS} as ct on ct.id = pm.categoria_fk
        `;
        const result = await pool.query(query_go);
        const obj = result.recordset;
        res.json(obj);
      } else {
        //Error 1: Token no valido || Expiro o formato incorrecto
        res.json(jsonres(400, "Token no valido"));
      }
    }
  } catch (e) {
    //Captura de error
    res.json(jsonres(404, "Error capturado 01"));
  }
}

module.exports = seeLote;
