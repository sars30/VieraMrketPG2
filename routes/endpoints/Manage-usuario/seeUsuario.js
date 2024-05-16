//Librerias
const jsonres = require("../../helper/jsonres");
const jwt_bool = require("../../helper/jwt");

//EndPoint Para consumir vendedores
async function seeUsuario(req, res, pool) {
    try {
        const parametro = req.body.Cedula;
        console.log(parametro); 
        
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrket',
            password: ''
        });

        // Ejecutar la consulta SQL
        const [rows, fields] = await connection.execute(`SELECT * FROM usuario where Cedula = ${parametro}`);
        
        console.log(rows);
        
        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: rows
        });
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
  /*try {
    //Se toma el token por el encabezado
    //const params = req.headers["authorization"];
    //Se verifica el parametro
    //if (!params || !params.startsWith("Bearer ")) {
    //  res.json(jsonres(400, "Error en la lectura/Recibimiento del parametro"));
    //} else {
      //Se verifica el JWT
    //  const des = await jwt_bool(params.split(" ")[1]);
     // if (des["estado"]) {
        //Se obtienen los objetos
        const query_go = `select *
        from usuario as us
        inner join rol as rl on rl.id_Rol =  us.Id_rol
        `;
        const result = await pool.query(query_go);
        const obj = result.recordset;
        res.json(obj);
      //} else {
        //Error 1: Token no valido || Expiro o formato incorrecto
      //  res.json(jsonres(400, "Token no valido"));
      //}
    //}
  } catch (e) {
    //Captura de error
    res.json(jsonres(404, "Error capturado 01"));
  }*/
}

module.exports = seeUsuario;
