// userRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController'); // Asegúrate de que la ruta sea correcta

// Asegúrate de que estas funciones existan en el controlador
router.get('/', userController.getUserHome);
router.get('/register', userController.getUserRegister);
router.post('/register', userController.postUserRegister);

module.exports = router;

