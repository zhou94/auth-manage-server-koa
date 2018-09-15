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
	uid: {
		type:Number,
		required:true
	},
	phone:{
		type:Number,
	},
	create_time: String,
	last_time:Number,
	roleId: {
		type:Number,
		default:1,
		required:true
	},  
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})

userSchema.index({create_at:-1});

const User = mongoose.model('User', userSchema);


module.exports =  User;
