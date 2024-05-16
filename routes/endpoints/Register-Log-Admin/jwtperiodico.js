//librerias
const jwt_bool = require("../../helper/jwt")
const jsonres = require('../../helper/jsonres')

async function jwt_periodico(req,res,pool){
    try{
        const token = req.headers['authorization'];
        if(!token || !token.startsWith('Bearer ') ){
            res.json(jsonres(400,"Error en los parametros ingresados"))
        }else{
            const jwt = await jwt_bool(token.split(' ')[1])
            if(jwt["estado"]){
                const query = `Select nombre from ${process.env.TABLA_ADMIN} 
                where nombre_red = '${jwt["user_red_jwt"]}'`
                const result = await pool.query(query)
                const len = result.recordset.length
                if(len == 1){
                    res.json(jsonres(200,"El token es valido"))
                }else{
                    res.json(jsonres(400,"Token Corrupto"))
                }
            }else{
                res.json(jsonres(400,"Sesion Caducada"))
            }
        }
    }catch(e){
        res.json(jsonres(404,"Error 01"))
    }
}

module.exports = jwt_periodico