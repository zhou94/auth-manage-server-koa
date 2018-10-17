'use strict';

const mongoose =require('mongoose');

const authSchema = new mongoose.Schema({
    roleId: {
		type:Number,
		required:true,
    },
    resources:{
        type:Array,
        required:true
    },
    
});

const Auths = mongoose.model('auth', authSchema);

module.exports = Auths;