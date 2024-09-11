const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Agrega un console.log para verificar la importación
console.log(userController);

// Definir las rutas
router.get('/', userController.getUserHome);

router.get('/login', userController.getUserLogin);
router.post('/login', userController.postUserLogin);

router.get('/registerUser', userController.getUserRegister);
router.post('/registerUser', userController.postUserRegister);

module.exports = router;

