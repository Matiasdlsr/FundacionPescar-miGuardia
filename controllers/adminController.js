const path = require('path');

// Función para cargar la vista de login de administrador
exports.getAdminLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/admin/loginAdmin.html'));
};

exports.getAdminIndex = (req, res) => {
    res.sendFile(path.join(__dirname, '../Admin','index.html'));
};

exports.postAdminLogin = (req, res) => {
    console.log(req.body);//muestra email y pass por consola 
    //si exite el mail 
        // si es admin       
            //Redirecciono a Admin/index.html y le permito editar
        //else Es Usuario
            //Redirecciono a Admin/index.html solo puede ver el estado

    //else NO EXISTE EL USUARIO
};


// Añadir más funciones para otras vistas de administrador si las necesitas

