const mongoose = require('mongoose');

const hospitalSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dire: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Hospital = mongoose.model('Hospital', hospitalSchema);
module.exports = Hospital;
