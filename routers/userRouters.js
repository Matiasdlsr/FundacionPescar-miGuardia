const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Ruta para mostrar la página de login de usuario
router.get('/login', userController.getUserLogin);

// Otras rutas de usuario pueden ser añadidas aquí

module.exports = router;
