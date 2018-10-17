'use strict';

const mongoose =  require('mongoose');

const Schema = mongoose.Schema;

const MeunSchema = new Schema({
    id:{
        type:Number,
        required:true
    },
    url:{
        type:String,
        required:true,
        default:''
    },
    pid:{
        type:Number,
        default:null
    },
    icon:{
        type:String,
        required:false,
        default:null
    },
    title:{
        type:String,
        required:true
    },
    auth:{
        type:Array
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

MeunSchema.index({createAt:-1});

const Menu = mongoose.model('Menu', MeunSchema);

module.exports =  Menu;