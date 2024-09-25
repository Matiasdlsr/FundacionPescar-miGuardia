const express = require('express');
const connectDB = require('./config/database');
require('dotenv').config();
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/userRouters');
const adminRoutes = require('./routers/adminRouters');

const app = express();

// Conectar a la base de datos
connectDB();

// Middleware para manejar el body de las solicitudes
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Archivos estáticos (CSS, JS, imágenes) en la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de las vistas
app.set('views', path.join(__dirname, 'views'));

// Ruta para servir archivos HTML estáticos (index.html)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'));
});

app.get('/nosotros',(req, res) => {
    res.sendFile(path.join(__dirname, 'views','nosotros.html'));
});

// Rutas para las rutas de usuarios y administradores
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

// Manejo de errores 404 (página no encontrada)
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Manejo de errores del servidor
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error en el servidor');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));
