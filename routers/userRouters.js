const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Agrega un console.log para verificar la importación
console.log(userController);

// Definir las rutas
router.get('/login',userController.getLogin);
router.get('/login',userController.postLogin);
router.get('/register',userController.getRegister)

module.exports = router;

