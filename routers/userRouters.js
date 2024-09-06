const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

// Agrega un console.log para verificar la importación
console.log(userController);

// Definir las rutas
router.get('/', userController.getUserHome);
router.get('/login', userController.getUserLogin);
router.get('/register', userController.getUserRegister);//adorno
router.post('/register', userController.postUserRegister);//adorno

module.exports = router;

