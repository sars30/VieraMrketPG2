const jsonres = require("../../helper/jsonres.js");

async function enviar_departamentos(req, res, pool){
    try{
        const query = `SELECT C1480 AS Codigo_Departamento , C1481 AS Nombre_Departamento FROM ${process.env.TABLA_DEPARTAMENTOS}
        where tz_lock = 0`
        const result = await pool.query(query);
        const array = result.recordset;
        res.json(array)
    }catch(e){
        res.json(jsonres(400,e))
    }

}

module.exports = enviar_departamentos