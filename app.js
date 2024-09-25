const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routers/userRouters');
const adminRoutes = require('./routers/adminRouters');

const app = express();

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// Configurar vistas
app.set('views', path.join(__dirname, 'views'));

// Conectar a la base de datos
connectDB();

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});
// Rutas de Admin y Usuario
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);

app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'nosotros.html'));
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));