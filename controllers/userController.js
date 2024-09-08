// userController.js
const path = require('path');
const User = require('../models/userModel');

exports.getUserHome = (req, res) => {
    res.render('user/index', { pageTitle: 'Página Principal de Usuario' });
};

// Función para cargar la vista de login de usuario
exports.getUserLogin = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/loginUser.html'));
};

// Manejar la autenticación de usuario
exports.postUserLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Buscar el usuario por nombre de usuario o email
        const user = await User.findOne({ username });

        if (!user) {
            // Si no se encuentra el usuario
            return res.render('user/loginUser', {
                pageTitle: 'Login de Usuario',
                errorMessage: 'Usuario o contraseña incorrectos.',
            });
        }

        // Comparar la contraseña ingresada con la almacenada
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            // Si la contraseña no coincide
            return res.render('user/loginUser', {
                pageTitle: 'Login de Usuario',
                errorMessage: 'Usuario o contraseña incorrectos.',
            });
        }

        // Si la autenticación es exitosa
        // Aquí podrías manejar la creación de una sesión o token JWT
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.render('user/loginUser', {
            pageTitle: 'Login de Usuario',
            errorMessage: 'Error al intentar iniciar sesión.',
        });
    }
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
