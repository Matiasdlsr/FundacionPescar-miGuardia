// userController.js
// Importaciones necesarias
const mongoose = require('mongoose');
const { Schema } = mongoose;

// Definición del esquema de usuario
const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  createDate: {
    type: Date,
    default: Date.now,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment',
    },
  ],
});


// Middleware para encriptar la contraseña antes de guardarla
userSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};


// Creación del modelo de usuario
const User = mongoose.model('User', userSchema);

// Función para mostrar la página principal de usuarios
exports.getUserHome = (req, res) => {
  // Renderiza la vista de la página principal de usuario
  res.render('user/index', { pageTitle: 'Página Principal de Usuario' });
};

// Función para mostrar el formulario de registro de usuario
exports.getUserRegister = (req, res) => {
  // Renderiza la vista de registro para el usuario
  res.render('user/register', { pageTitle: 'Registro de Usuario' });
};

// Función para manejar el registro de un nuevo usuario
exports.postUserRegister = async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // Validación y creación del nuevo usuario
    const newUser = new User({
      username,
      email,
      password, // Asegúrate de encriptar la contraseña antes de guardarla
    });

    await newUser.save();

    // Si el registro es exitoso
    res.redirect('/');
  } catch (error) {
    // Si hay errores de validación o guardado
    res.render('user/register', {
      pageTitle: 'Registro de Usuario',
      errorMessage: 'Error al registrar usuario',
    });
  }
};

// Exportación del modelo de usuario para ser usado en otros archivos
module.exports = { User };
