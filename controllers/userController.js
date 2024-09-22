// userController.js
const path = require('path');
const User = require('../models/userModel');
const conexion = require('../config/database');
const fs = require('fs');
const usersFilePath = path.join(__dirname, '../views/user/users.json');
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
    console.log(req.body);

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


//Carga la pagina de Registro
exports.getUserRegister = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/user/registerUser.html'));
};

//Se registra el Usuario
exports.postUserRegister = async (req, res) => {
    console.log(req.body.email);
    const { name, lastname, email, password } = req.body;

    /* try {
        // Verificar si el usuario ya existe
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('El usuario ya existe');
        }

        // Crear un nuevo usuario
        user = new User({
            name,
            lastname,
            email,
            password
        });
        // Guardar el usuario en la base de datos
        await user.save();

        res.status(201).send('Usuario registrado exitosamente');
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).send('Error del servidor');
    }
};
 */
fs.readFile(usersFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error al leer el archivo JSON:', err);
        return res.status(500).send('Error al registrar usuario.');
    }

    // Parsear el contenido del archivo a un array
    let users = [];
    if (data) {
        users = JSON.parse(data);
    }

    // Verificar si el usuario ya existe en el JSON
    const userExists = users.some(user => user.email === email);

    if (userExists) {
        return res.status(400).send('El usuario ya existe');
    }

    // Crear el nuevo usuario
    const newUser = { name, lastname, email, password };

    // Agregar el nuevo usuario al array
    users.push(newUser);

    // Escribir el array actualizado de vuelta al archivo JSON
    fs.writeFile(usersFilePath, JSON.stringify(users, null, 2), (err) => {
        if (err) {
            console.error('Error al escribir en el archivo JSON:', err);
            return res.status(500).send('Error al registrar usuario.');
        }

        res.status(201).send('Usuario registrado exitosamente');
        window.location.href = '/register';
    });
});
};
