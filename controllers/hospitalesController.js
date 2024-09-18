const fs = require('fs');
const path = require('path');

let hospitalesData = null;

// Cargar el archivo una vez al iniciar la aplicación
const loadHospitalesData = () => {
  const filePath = path.join(__dirname, '..', 'models', 'guardias.json');
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
