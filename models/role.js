'use strict';

const mongoose =  require('mongoose')

const Schema = mongoose.Schema;

const roleSchema = new Schema({
	roleId: {
		type:Number,
		required:true,
	},
    roleName:{
		type:String,
		required:true
    },
    description:{
        type:String,
        default:'角色'
    }
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}})

roleSchema.index({create_at:-1});

const Role = mongoose.model('Role', roleSchema);


module.exports =  Role;
