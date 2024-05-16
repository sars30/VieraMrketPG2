const jsonres = require("../../helper/jsonres.js");

async function enviar_categorias(req, res, pool){
    try{
        const query = `SELECT * FROM ${process.env.TABLA_CATEGORIAS}`
        const result = await pool.query(query);
        const array = result.recordset;
        res.json(array)
    }catch(e){
        res.json(jsonres(400,e))
    }

}

module.exports = enviar_categorias