const express = require('express');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'crud_usuarios'
});

connection.connect(function(error) {
  if (error) {
    console.error('Error de conexión: ' + error.stack);
    return;
  }

  console.log('Conexión establecida con la base de datos.');
});

// Instancia de la aplicación de Express
const app = express();

app.use(cors());
app.use(bodyParser.json());


// Crear las rutas para el CRUD

// Obtener todos los estudiantes
app.get('/estudiantes', function(req, res) {
  const query = 'SELECT * FROM estudiantes';

  connection.query(query, function(error, results) {
    if (error) throw error;

    res.send(results);
  });
});

// Obtener un estudiante por ID
app.get('/estudiantes/:id', function(req, res) {
  const id = req.params.id;
  const query = 'SELECT * FROM estudiantes WHERE id = ?';

  connection.query(query, [id], function(error, results) {
    if (error) throw error;

    res.send(results[0]);
  });
});

// Crear un nuevo estudiante
app.post('/estudiantes', function(req, res) {
  const estudiante = req.body;
  const query = 'INSERT INTO estudiantes SET ?';

  connection.query(query, estudiante, function(error, result) {
    if (error) throw error;

    res.send(result);
  });
});

// Actualizar un estudiante existente
app.put('/estudiantes/:id', function(req, res) {
  const id = req.params.id;
  const estudiante = req.body;
  const query = 'UPDATE estudiantes SET ? WHERE id = ?';

  connection.query(query, [estudiante, id], function(error, result) {
    if (error) throw error;

    res.send(result);
  });
});

// Eliminar un estudiante
app.delete('/estudiantes/:id', function(req, res) {
  const id = req.params.id;
  const query = 'DELETE FROM estudiantes WHERE id = ?';

  connection.query(query, [id], function(error, result) {
    if (error) throw error;

    res.send(result);
  });
});

// Inicia el servidor de Express y escucha en un puerto
const port = process.env.PORT || 9000;

app.listen(port, function() {
  console.log('El servidor está escuchando en el puerto ' + port);
});
