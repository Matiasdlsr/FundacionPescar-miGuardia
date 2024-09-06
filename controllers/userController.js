const path = require('path');

// Función para cargar la vista de login de usuario
exports.getUserLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/loginUser.html'));
};

// Añadir más funciones para otras vistas de usuario si las necesitas
