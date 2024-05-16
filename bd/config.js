// Importa la biblioteca mysql
const mysql = require('mysql');

// Configura la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'vieramrkt'
});

// Conéctate a la base de datos
connection.connect((err) => {
  if (err) {
    console.error('Error de conexión:', err);
    return;
  }
  console.log('Conexión a la base de datos MySQL establecida.');
});

module.exports = connection