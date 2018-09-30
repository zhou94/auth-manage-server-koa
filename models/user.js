'use strict';

const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const userSchema = new Schema({
	account: {
		type:String,
		required:true,
	},
    password:{
		type:String,
		required:true
	},
    nickname:{
		type:String,
		required:true
	},
	avatar:{
		type:String,
		default:'avatar.jpg'
	},
	uid: {
		type:Number,
		required:true
	},
	phone:{
		type:Number,
	},
	roleId: {
		type:Number,
		default:1,
		required:true
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
})

userSchema.index({createAt:-1});

const User = mongoose.model('User', userSchema);


module.exports =  User;
