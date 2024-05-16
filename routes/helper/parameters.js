async function obtener_tiempo_jwt(pool){
    const time_res = await pool.query(`Select parametro from ${process.env.TABLA_PARAMETROS} where id = 1`)
    const time_exp = time_res.recordset[0]
    return time_exp["parametro"]
    
}

module.exports = obtener_tiempo_jwt