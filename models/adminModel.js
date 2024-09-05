// adminModel.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Definición del esquema para Administradores
const adminSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'admin',
    }
}, {
    timestamps: true // Añade createdAt y updatedAt automáticamente
});

// Creación del modelo Admin basado en el esquema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
