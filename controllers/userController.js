// userController.js
const path = require('path');

exports.getUserHome = (req, res) => {
    res.render('user/index', { pageTitle: 'Página Principal de Usuario' });
};

// Función para cargar la vista de login de usuario
exports.getUserLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/loginUser.html'));
};

exports.getUserRegister = (req, res) => {
    res.render('user/register', { pageTitle: 'Registro de Usuario' });
};

exports.postUserRegister = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Crear y guardar el usuario
        const newUser = new User({ username, email, password });
        await newUser.save();

        // Redirige al usuario después del registro
        res.redirect('/user');
    } catch (error) {
        res.render('user/register', {
            pageTitle: 'Registro de Usuario',
            errorMessage: 'Error al registrar usuario',
        });
    }
};
