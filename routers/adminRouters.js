const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');

// Ruta para mostrar la página de login de admin
router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);
// Otras rutas de admin pueden ser añadidas aquí

module.exports = router;
