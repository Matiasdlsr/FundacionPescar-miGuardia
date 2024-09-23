const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const userRoutes = require('./routers/userRouters');
const adminRoutes = require('./routers/adminRouters');
const { getHospitales, getGuards, getComments, getUsers } = require('./controllers/hospitalesController');

dotenv.config();
const app = express();

// Configurar middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin', express.static(path.join(__dirname, 'Admin')));

// Configurar vistas
app.set('views', path.join(__dirname, 'views'));

// Definir rutas de archivos
const guardsFilePath = path.join(__dirname, 'InfoGuardia', 'miGuardia.hospitals.json');

// Conectar a la base de datos
connectDB();

// Rutas principales
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.get('/nosotros', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'nosotros.html'));
});

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'user', 'loginUser.html'));
});

// Rutas de API
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);
app.get('/api/hospitales', getHospitales);
app.get('/api/guards', getGuards);
app.get('/api/comments', getComments);
app.get('/api/users', getUsers);

// Funciones auxiliares para manejar datos de guardias
function readGuardsData() {
    try {
        if (!fs.existsSync(guardsFilePath)) {
            fs.writeFileSync(guardsFilePath, '[]', 'utf8');
            return [];
        }
        const data = fs.readFileSync(guardsFilePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error al leer los datos de las guardias:', error);
        return [];
    }
}

function writeGuardsData(data) {
    try {
        fs.writeFileSync(guardsFilePath, JSON.stringify(data, null, 2));
    } catch (error) {
        console.error('Error al escribir los datos de las guardias:', error);
    }
}

// Ruta POST para agregar una nueva guardia
app.post('/api/guards', (req, res) => {
    const { guardType, guardStatus, floor } = req.body;

    if (!guardType || !guardStatus || !floor) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const newGuard = {
        id: Date.now(),
        guardType,
        guardStatus,
        floor: parseInt(floor, 10)
    };

    const guards = readGuardsData();
    guards.push(newGuard);
    writeGuardsData(guards);

    res.status(201).json(newGuard);
});

// Ruta para obtener los hospitales desde el archivo JSON
app.get('/InfoGuardia/miGuardia.hospitals.json', (req, res) => {
    res.sendFile(guardsFilePath);
});

// Manejo de errores 404
app.use((req, res) => {
    res.status(404).send('Página no encontrada');
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));