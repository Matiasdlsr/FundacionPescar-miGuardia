const express = require('express');
const { searchHospitals } = require('../controllers/hospitalController');
const router = express.Router();

router.get('/search', searchHospitals); // Ruta para buscar hospitales

module.exports = router;