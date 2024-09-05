const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

// Ruta para la página principal de administración
router.get('/', adminController.getAdminHome);

// Ruta para la página de inicio de sesión del administrador
router.get('/login', adminController.getAdminLogin);

// Ejemplo de ruta para manejar el inicio de sesión (POST)
router.post('/login', adminController.postAdminLogin);

// Otras rutas de administración pueden ser agregadas aquí

module.exports = router;
