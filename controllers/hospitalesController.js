const fs = require('fs');
const path = require('path');

let hospitalesData = null;
let guardsData = null;
let commentsData = null;
let usersData = null;

// Cargar múltiples archivos JSON
const loadData = () => {
  const filesToLoad = {
    hospitales: 'miGuardia.hospitals.json',
    guards: 'miGuardia.guards.json',
    comments: 'miGuardia.comments.json',
    users: 'miGuardia.users.json'
  };

  for (const [key, file] of Object.entries(filesToLoad)) {
    const filePath = path.join(__dirname, '..', 'InfoGuardia', file);
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(`Error al leer el archivo ${file}:`, err);
        return;
      }
      try {
        if (key === 'hospitales') hospitalesData = JSON.parse(data);
        if (key === 'guards') guardsData = JSON.parse(data);
        if (key === 'comments') commentsData = JSON.parse(data);
        if (key === 'users') usersData = JSON.parse(data);
        console.log(`Datos de ${key} cargados correctamente`);
      } catch (parseError) {
        console.error(`Error al parsear el archivo ${file}:`, parseError);
      }
    });
  }
};

// Llamar a la función de carga
loadData();

// Controladores para cada tipo de datos
const getHospitales = (req, res) => {
  if (!hospitalesData) {
    return res.status(500).json({ error: 'Datos de hospitales no disponibles' });
  }
  res.json(hospitalesData);
};

const getGuards = (req, res) => {
  if (!guardsData) {
    return res.status(500).json({ error: 'Datos de guardias no disponibles' });
  }
  res.json(guardsData);
};

const getComments = (req, res) => {
  if (!commentsData) {
    return res.status(500).json({ error: 'Datos de comentarios no disponibles' });
  }
  res.json(commentsData);
};

const getUsers = (req, res) => {
  if (!usersData) {
    return res.status(500).json({ error: 'Datos de usuarios no disponibles' });
  }
  res.json(usersData);
};

module.exports = {
  getHospitales,
  getGuards,
  getComments,
  getUsers
};
