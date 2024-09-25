const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController.js');
// Agrega un console.log para verificar la importación
console.log(adminController);
// Ruta para mostrar la página de login de admin
/*
router.get('/login', adminController.getAdminLogin);
router.post('/login', adminController.postAdminLogin);
router.post('/', adminController.getAdminIndex);*/
// Otras rutas de admin pueden ser añadidas aquí

module.exports = router;
