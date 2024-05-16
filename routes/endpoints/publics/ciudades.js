const jsonres = require("../../helper/jsonres.js");

async function enviar_ciudades(req, res, pool) {
  let objs = [];
  try {
    const query = `SELECT tcd.C1480 as Codigo_Departamento, tcc.c1206 as Codigo_ciudad, tcc.c1207 as Nombre_Ciudad 
    FROM ${process.env.TABLA_CIUDADES} as tcc
    INNER JOIN ${process.env.TABLA_DEPARTAMENTOS} as tcd on tcd.c1480 = tcc.c1205`;
    const result = await pool.query(query);
    objs = result.recordset;
    if (objs.length > 0) {
      res.json({
        codigo: 200,
        objs,
      });
    } else {
      res.json({
        codigo: jsonres(400, "No se encontro registro"),
        objs,
      });
    }
  } catch (e) {
    res.json({
      codigo: jsonres(400, e),
      objs,
    });
  }
}

module.exports = enviar_ciudades;
