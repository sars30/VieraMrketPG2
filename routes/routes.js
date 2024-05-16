// Importar librerías y módulos
const express = require('express');
const routes = express.Router();
const pool = require('../bd/config.js');
// EndPoint ecco
const mysql = require('mysql2/promise');

// Función asíncrona para manejar las solicitudes
routes.get('/seeUsuario', async (req, res) => {
    try {
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL
        const [rows, fields] = await connection.execute(`SELECT * FROM usuario`);
        
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
});

routes.get('/seeRol', async (req, res) => {
    try {
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL
        const [rows, fields] = await connection.execute(`SELECT * FROM rol`);
        
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
});

routes.get('/seeProducto', async (req, res) => {
    try {
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL
        const [rows, fields] = await connection.execute(`SELECT * FROM producto`);
        
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
});

routes.get('/seeLote', async (req, res) => {
    try {
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL
        const [rows, fields] = await connection.execute(`SELECT * FROM lote`);
        
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
});


routes.get('/seeProveedor', async (req, res) => {
    try {
        const parametro = req.body.Cedula;
        console.log(parametro); 
        
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL
        const [rows, fields] = await connection.execute(`SELECT * FROM proveedor`);
        
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
});

routes.post('/log', async (req, res) => {
    try {
        // Recibir los datos a insertar desde el cuerpo de la solicitud
        const { Cedula, contrasena } = req.body;

        // Log de los datos recibidos
        console.log('Datos recibidos:', req.body);

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        try {
            // Ejecutar la consulta SQL para validar el usuario
            const [rows, fields] = await connection.execute(`
            SELECT usuario.*, rol.Nom_Rol 
            FROM usuario 
            INNER JOIN rol ON usuario.Id_Rol = rol.Id_Rol
            WHERE usuario.Cedula = ?`, [Cedula]);

            // Cerrar la conexión
            await connection.end();

            // Verificar si se encontró un usuario
            if (rows.length === 0) {
                return res.status(404).json({
                    codigo: 404,
                    mensaje: 'Usuario no encontrado'
                });
            }

            // Verificar la contraseña
            const user = rows[0];
            if (user.contrasena === contrasena) {
                return res.json({
                    codigo: 200,
                    mensaje: 'Logueo exitoso',
                    usuario: user
                });
            } else {
                return res.status(400).json({
                    codigo: 400,
                    mensaje: 'La contraseña no coincide'
                });
            }
        } catch (sqlError) {
            console.error('Error en la consulta SQL:', sqlError);
            await connection.end();
            return res.status(500).json({
                codigo: 500,
                mensaje: 'Error en la consulta a la base de datos'
            });
        }
    } catch (error) {
        console.error('Error al loguearse:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/addUsuario', async (req, res) => {
    try {        
        // Recibir los datos a insertar desde el cuerpo de la solicitud
        const { Cedula, nombre, apellido, direccion, correo, fecha_nac, contrasena, Id_Rol, estado } = req.body;

        // Log de los datos recibidos
        console.log('Datos recibidos:', req.body);

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para insertar datos
        const [result] = await connection.execute(
            'INSERT INTO usuario (Cedula, nombre, apellido, direccion, correo, fecha_nac, contrasena, Id_Rol, estado) VALUES (?, ?, ?, ?, ?, ? , ?, ?, ?)',
            [Cedula, nombre, apellido, direccion, correo, fecha_nac, contrasena, Id_Rol, estado]
        );

        console.log('Usuario insertado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Usuario insertado correctamente'
        });
    } catch (error) {
        console.error('Error al insertar el usuario:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/addRol', async (req, res) => {
    try {        
        // Recibir los datos a insertar desde el cuerpo de la solicitud
        const { Nom_Rol, estado } = req.body;

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para insertar datos
        const [result] = await connection.execute(
            'INSERT INTO rol (Nom_Rol, estado) VALUES (?, ?)',
            [Nom_Rol, estado]
        );

        console.log('Rol insertado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Rol insertado correctamente'
        });
    } catch (error) {
        console.error('Error al insertar el rol:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/addLote', async (req, res) => {
    try {        
        // Recibir los datos a insertar desde el cuerpo de la solicitud
        const { Cod_Lote, Fecha_ingreso, Fecha_venc, Fecha_fabri, Unidades, Descripcion, estado, Id_Producto, Id_Proveedor} = req.body;

        console.log(req.body)
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para insertar datos
        const [result] = await connection.execute(
            'INSERT INTO lote (Cod_Lote, Fecha_ingreso, Fecha_venc, Fecha_fabri, Unidades, Descripcion, estado, Id_Producto, Id_Proveedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [Cod_Lote, Fecha_ingreso, Fecha_venc, Fecha_fabri, Unidades, Descripcion, estado, Id_Producto, Id_Proveedor]
        );

        console.log('Lote insertado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Lote insertado correctamente'
        });
    } catch (error) {
        console.error('Error al insertar el lote:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/addProducto', async (req, res) => {
    try {        
        // Recibir los datos a insertar desde el cuerpo de la solicitud
        const { Nombre, Descripcion, estado, Cedula } = req.body;

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para insertar datos
        const [result] = await connection.execute(
            'INSERT INTO producto ( Nombre, Descripcion, estado, Cedula) VALUES (?, ?, ?, ?)',
            [ Nombre, Descripcion, estado, Cedula]
        );

        console.log('Producto insertado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Producto insertado correctamente'
        });
    } catch (error) {
        console.error('Error al insertar el producto:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/addProveedor', async (req, res) => {
    try {        
        // Recibir los datos a insertar desde el cuerpo de la solicitud
        const { nombre, estado, telefono } = req.body;

        console.log(req.body)
        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para insertar datos
        const [result] = await connection.execute(
            'INSERT INTO proveedor (nombre, estado, telefono) VALUES (?, ?, ?)',
            [nombre, estado, telefono]
        );

        console.log('Proveedor insertado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Proveedor insertado correctamente'
        });
    } catch (error) {
        console.error('Error al insertar el proveedor:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// Establecer la ruta para actualizar un usuario
routes.post('/updateUsuario', async (req, res) => {
    try {
        // Validar que todos los campos necesarios estén presentes en el cuerpo de la solicitud
        const { Cedula, nombre, apellido, direccion, correo, fecha_nac, contrasena, Id_Rol, estado } = req.body;
        if (!Cedula || !nombre || !apellido || !direccion || !correo || !fecha_nac || !contrasena || !Id_Rol || !estado) {
            return res.status(400).json({
                codigo: 400,
                mensaje: 'Todos los campos son requeridos'
            });
        }

        // Establecer la conexión con la base de datos utilizando un pool de conexiones
        const connection = mysql.createPool({
            connectionLimit: 10,
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para actualizar los datos del usuario
        const [result] = await connection.execute(
            'UPDATE usuario SET nombre=?, apellido=?, direccion=?, correo=?, fecha_nac=?, contrasena=?, Id_Rol=?, estado=? WHERE Cedula=?',
            [nombre, apellido, direccion, correo, fecha_nac, contrasena, Id_Rol, estado, Cedula]
        );

        console.log('Usuario actualizado:', result);

        // Cerrar la conexión de manera segura
        connection.end();

        // Responder con un mensaje de éxito
        res.json({
            codigo: 200,
            mensaje: 'Usuario actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/updateProducto', async (req, res) => {
    try {        
        // Recibir los datos a actualizar desde el cuerpo de la solicitud
        const { Id_Producto, Nombre, Descripcion, estado, Cedula } = req.body;

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para actualizar datos
        const [result] = await connection.execute(
            'UPDATE producto SET Nombre = ?, Descripcion = ?, estado = ?, Cedula = ? WHERE Id_Producto = ?',
            [Nombre, Descripcion, estado, Cedula, Id_Producto]
        );

        console.log('Producto actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Producto actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/updateProveedor', async (req, res) => {
    try {        
        // Receive data to update from the request body
        const { Id_Proveedor, nombre, estado, telefono } = req.body;

        // Establish connection with the database
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Execute the SQL query to update data
        const [result] = await connection.execute(
            'UPDATE proveedor SET nombre = ?, estado = ?, telefono = ? WHERE Id_Proveedor = ?',
            [nombre, estado, telefono, Id_Proveedor]
        );

        console.log('Proveedor actualizado:', result);

        // Close the connection
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Proveedor actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/updateLote', async (req, res) => {
    try {        
        // Recibir los datos a actualizar desde el cuerpo de la solicitud
        const { Cod_Lote, Fecha_ingreso, Fecha_venc, Fecha_fabri, Unidades, Descripcion, estado, Id_Producto, Id_Proveedor} = req.body;

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para actualizar datos
        const [result] = await connection.execute(
            'UPDATE lote SET Fecha_ingreso = ?, Fecha_venc = ?, Fecha_fabri = ?, Unidades = ?, Descripcion = ?, estado = ?, Id_Producto = ?, Id_Proveedor = ? WHERE Cod_Lote = ?',
            [Fecha_ingreso, Fecha_venc, Fecha_fabri, Unidades, Descripcion, estado, Id_Producto, Id_Proveedor, Cod_Lote]
        );

        console.log('Lote actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Lote actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el lote:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

routes.post('/updateRol', async (req, res) => {
    try {
        // Recibir los datos a actualizar desde el cuerpo de la solicitud
        const { Id_Rol, Nom_Rol, estado } = req.body;

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Ejecutar la consulta SQL para actualizar datos
        const [result] = await connection.execute(
            'UPDATE rol SET Nom_Rol = ?, estado = ? WHERE Id_Rol = ?',
            [Nom_Rol, estado, Id_Rol]
        );

        console.log('Rol actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Rol actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el rol:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// Establecer la ruta para actualizar el estado de un lote
routes.post('/estadoLote', async (req, res) => {
    try {
        // Recibir el Cod_Lote desde el cuerpo de la solicitud
        const { Cod_Lote } = req.body;
        if (!Cod_Lote) {
            return res.status(400).json({
                codigo: 400,
                mensaje: 'Cod_Lote es un campo requerido'
            });
        }

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Obtener el estado actual del lote
        const [rows] = await connection.execute(
            'SELECT estado FROM lote WHERE Cod_Lote = ?',
            [Cod_Lote]
        );

        // Verificar el estado actual y establecer el nuevo estado
        let nuevoEstado = 0;
        if (rows.length > 0) {
            const estadoActual = rows[0].estado;
            nuevoEstado = estadoActual === 0 ? 1 : 0;
        }

        // Ejecutar la consulta SQL para actualizar el estado del lote
        const [result] = await connection.execute(
            'UPDATE lote SET estado = ? WHERE Cod_Lote = ?',
            [nuevoEstado, Cod_Lote]
        );

        console.log('Lote actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Estado del lote actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el estado del lote:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// Establecer la ruta para actualizar el estado de un producto
routes.post('/estadoProducto', async (req, res) => {
    try {
        // Recibir el Cod_Lote desde el cuerpo de la solicitud
        const { Id_Producto } = req.body;
        if (!Id_Producto) {
            return res.status(400).json({
                codigo: 400,
                mensaje: 'Id_Producto es un campo requerido'
            });
        }

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Obtener el estado actual del lote
        const [rows] = await connection.execute(
            'SELECT estado FROM producto WHERE Id_Producto = ?',
            [Id_Producto]
        );

        // Verificar el estado actual y establecer el nuevo estado
        let nuevoEstado = 0;
        if (rows.length > 0) {
            const estadoActual = rows[0].estado;
            nuevoEstado = estadoActual === 0 ? 1 : 0;
        }

        // Ejecutar la consulta SQL para actualizar el estado del lote
        const [result] = await connection.execute(
            'UPDATE producto SET estado = ? WHERE Id_Producto = ?',
            [nuevoEstado, Id_Producto]
        );

        console.log('Producto actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Estado del producto actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// Establecer la ruta para actualizar el estado de un rol
routes.post('/estadoRol', async (req, res) => {
    try {
        // Recibir el Cod_Lote desde el cuerpo de la solicitud
        const { Id_Rol } = req.body;
        if (!Id_Rol) {
            return res.status(400).json({
                codigo: 400,
                mensaje: 'Id_Rol es un campo requerido'
            });
        }

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Obtener el estado actual del lote
        const [rows] = await connection.execute(
            'SELECT estado FROM rol WHERE Id_Rol = ?',
            [Id_Rol]
        );

        // Verificar el estado actual y establecer el nuevo estado
        let nuevoEstado = 0;
        if (rows.length > 0) {
            const estadoActual = rows[0].estado;
            nuevoEstado = estadoActual === 0 ? 1 : 0;
        }

        // Ejecutar la consulta SQL para actualizar el estado del lote
        const [result] = await connection.execute(
            'UPDATE rol SET estado = ? WHERE Id_Rol = ?',
            [nuevoEstado, Id_Rol]
        );

        console.log('Producto actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Estado del producto actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el estado del producto:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// Establecer la ruta para actualizar el estado de un proveedor
routes.post('/estadoProveedor', async (req, res) => {
    try {
        // Recibir el Cod_Lote desde el cuerpo de la solicitud
        const { Id_Proveedor } = req.body;
        if (!Id_Proveedor) {
            return res.status(400).json({
                codigo: 400,
                mensaje: 'Id_Proveedor es un campo requerido'
            });
        }

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Obtener el estado actual del lote
        const [rows] = await connection.execute(
            'SELECT estado FROM proveedor WHERE Id_Proveedor = ?',
            [Id_Proveedor]
        );

        // Verificar el estado actual y establecer el nuevo estado
        let nuevoEstado = 0;
        if (rows.length > 0) {
            const estadoActual = rows[0].estado;
            nuevoEstado = estadoActual === 0 ? 1 : 0;
        }

        // Ejecutar la consulta SQL para actualizar el estado del lote
        const [result] = await connection.execute(
            'UPDATE proveedor SET estado = ? WHERE Id_Proveedor = ?',
            [nuevoEstado, Id_Proveedor]
        );

        console.log('Proveedor actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Estado del proveedor actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el estado del proveedor:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// Establecer la ruta para actualizar el estado de un proveedor
routes.post('/estadoUsuario', async (req, res) => {
    try {
        // Recibir el Cod_Lote desde el cuerpo de la solicitud
        const { Cedula } = req.body;
        if (!Cedula) {
            return res.status(400).json({
                codigo: 400,
                mensaje: 'Cedula es un campo requerido'
            });
        }

        // Establecer la conexión con la base de datos
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            database: 'vieramrkt',
            password: ''
        });

        // Obtener el estado actual del lote
        const [rows] = await connection.execute(
            'SELECT estado FROM usuario WHERE Cedula = ?',
            [Cedula]
        );

        // Verificar el estado actual y establecer el nuevo estado
        let nuevoEstado = 0;
        if (rows.length > 0) {
            const estadoActual = rows[0].estado;
            nuevoEstado = estadoActual === 0 ? 1 : 0;
        }

        // Ejecutar la consulta SQL para actualizar el estado del lote
        const [result] = await connection.execute(
            'UPDATE usuario SET estado = ? WHERE Cedula = ?',
            [nuevoEstado, Cedula]
        );

        console.log('Usuario actualizado:', result);

        // Cerrar la conexión
        await connection.end();

        res.json({
            codigo: 200,
            mensaje: 'Estado del usuario actualizado correctamente'
        });
    } catch (error) {
        console.error('Error al actualizar el estado del usuario:', error);
        res.status(500).json({
            codigo: 500,
            mensaje: 'Error interno del servidor'
        });
    }
});

// EndPoint ecco
routes.post('/ecco', (req, res) => {
    res.send('Status Online');
});

module.exports = routes;
