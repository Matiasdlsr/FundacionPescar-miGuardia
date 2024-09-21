// app.js
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/userRouters');
const adminRoutes = require('./routers/adminRouters');
const dotenv = require('dotenv');
const connectDB = require('./config/database'); // Ajusta esta ruta según tu estructura de archivos
const router = express.Router(); 
const { getHospitales, getGuards, getComments, getUsers } = require('./controllers/hospitalesController');
//Importar desde el archivo JSON
const hospitales = require('./InfoGuardia/miGuardia.hospitals.json'); 

dotenv.config(); // Esta línea debe estar aquí, antes de cualquier uso de process.env
const app = express();

// Configurar vistas y archivos estáticos
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', express.static(path.join(__dirname, 'Admin')));


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
// Ruta para la página principal (raíz)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html')); // Servir index.html
});
// Conectar a la base de datos
connectDB();
// Rutas
app.use('/user', userRoutes);
app.use('/admin', adminRoutes);



// Ruta para obtener los hospitales
app.get('/api/hospitales', getHospitales);

// Ruta para obtener las guardias
app.get('/api/guards', getGuards);

// Ruta para obtener los comentarios
app.get('/api/comments', getComments);

// Ruta para obtener los usuarios
app.get('/api/users', getUsers);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto http://localhost:${PORT}`));



//Ruta para los hospitales 
app.get('/InfoGuardia/miGuardia.hospitals.json', (req , res) =>{
    res.json(hospitales)}); 


    app.use((req, res, next) => {
        res.status(404).send('Página no encontrada');
    });
    