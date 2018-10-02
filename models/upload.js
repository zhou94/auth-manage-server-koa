'use strict';

const mongoose =require('mongoose');

const uploadSchema = new mongoose.Schema({
    id: Number,
    path:String
});

const uploads = mongoose.model('upload', uploadSchema);

module.exports = uploads;