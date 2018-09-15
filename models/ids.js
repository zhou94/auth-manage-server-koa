'use strict';

const mongoose =require('mongoose');

const idsSchema = new mongoose.Schema({
    _id: String,
    sequence_value:{
        type:Number
    }
});

const Ids = mongoose.model('Ids', idsSchema);

module.exports = Ids;