//userController.js
const path = require('path');
const User = require('../models/userModel');
const conexion = require('../config/database');
const fs = require('fs');
const dirLocation= '../views/user/';

exports.getLogin = (req, res) => {
    res.sendFile(path.join(__dirname, dirLocation +'/loginUser.html'));
};

exports.postLogin = (req, res) => {
    res.sendFile(path.join(__dirname, dirLocation +'/loginUser.html'));
};

exports.getRegister = (req, res) =>{
    res.sendFile(path.join(__dirname, dirLocation +'/registerUser.html'))
}