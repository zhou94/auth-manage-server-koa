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
    },
    meta: {
        createAt: {
            type: Date,
            default: Date.now()
        },
        updateAt: {
            type: Date,
            default: Date.now()
        }
    }
});

const Token = mongoose.model('token', tokenSchema);

module.exports = Token;