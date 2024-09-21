const fs = require('fs');
const path = require('path');

let hospitalesData = null;

// Cargar el archivo una vez al iniciar la aplicación
const loadHospitalesData = () => {
  const filePath = path.join(__dirname, '..', 'models', 'miGuardia.hospitals.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.error('Error al leer el archivo:', err);
      return;
    }
    try {
      hospitalesData = JSON.parse(data); // Almacena el JSON en memoria
      console.log('Datos de hospitales cargados correctamente');
    } catch (parseError) {
      console.error('Error al parsear el archivo JSON:', parseError);
    }
  });
};

// Función para obtener hospitales
const getHospitales = (req, res) => {
  if (!hospitalesData) {
    return res.status(500).json({ error: 'Datos de hospitales no disponibles' });
  }
  res.json(hospitalesData);
};

// Cargar los datos al iniciar la aplicación
loadHospitalesData();

module.exports = {
  getHospitales
};

const Hospital = require('../models/hospitalModel');

const searchHospitals = async (req, res) => {
  try {
    const { query } = req.query; // Obtener el texto de búsqueda del query string
    const hospitals = await Hospital.find({
      name: { $regex: query, $options: 'i' } // Búsqueda que no distingue entre mayúsculas/minúsculas
    });
    res.json(hospitals); // Devolver la lista de hospitales encontrados como JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al buscar hospitales' });
  }
};

module.exports = { searchHospitals };