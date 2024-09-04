
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session'); 


// Importar rutas
const adminRouters = require('./routers/adminRouters');
const userRouters = require('./routers/userRouters'); 

const app = express(); 


// Conectar a la base de datos
mongoose.connect('mongodb://127.0.0.1:27017/test', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch(err => console.error('Error al conectar a la base de datos:', err)); 

// Configurar motor de vistas
app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs'); // Puedes cambiar 'ejs' por tu motor de vistas preferido (ej: pug, handlebars)

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar rutas
app.use('/admin', adminRouters);
app.use('/user', userRouters);

// Manejo de errores 404
app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Página no encontrada' });
});


// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});    

