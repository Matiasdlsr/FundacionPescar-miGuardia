// userController.js

exports.getUserHome = (req, res) => {
    res.render('user/index', { pageTitle: 'Página Principal de Usuario' });
};

exports.getUserRegister = (req, res) => {
    res.render('user/register', { pageTitle: 'Registro de Usuario' });
};

exports.postUserRegister = (req, res) => {
    const { username, password, email } = req.body;

    // Aquí va la lógica de registro
    res.redirect('/user');
};
