// adminModel.js
const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true },
  managedGuardias: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Guardia' }]
});
// Creación del modelo Admin basado en el esquema
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
