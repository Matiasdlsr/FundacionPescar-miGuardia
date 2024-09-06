const path = require('path');

// Función para cargar la vista de login de administrador
exports.getAdminLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/loginAdmin.html'));
};

// Añadir más funciones para otras vistas de administrador si las necesitas

