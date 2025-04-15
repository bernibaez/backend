const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
const DB_PATH = path.join(__dirname, 'db.json');

app.use(cors());
app.use(express.json());

// Ruta base opcional para que Render no diga "Cannot GET /"
app.get('/', (req, res) => {
  res.send('Backend de AIO funcionando correctamente 🚀');
});

// Obtener todos los mensajes
app.get('/api/messages', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  res.json(data);
});

// Guardar nuevo mensaje
app.post('/api/messages', (req, res) => {
  const data = JSON.parse(fs.readFileSync(DB_PATH));
  data.push(req.body);
  fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
  res.json({ success: true });
});

// Actualizar mensajes completos
app.put('/api/messages', (req, res) => {
  fs.writeFileSync(DB_PATH, JSON.stringify(req.body, null, 2));
  res.json({ success: true });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

