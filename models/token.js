'use strict';

const mongoose =require('mongoose');

const tokenSchema = new mongoose.Schema({
    uid:{
        required:true,
        type:Number
    },
    token:{
        required:true,
        type:String
    }
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;