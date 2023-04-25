const mongoose = require('mongoose')

let Registeruser = new mongoose.Schema({
    username:{
        type: String,
        required: true
    },
    email:{
        type:String,
        required: true,
        unique:true
    },
    password:{
        type:String,
        required: true,
    },
    image:{
        type:String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },
    
})

module.exports = mongoose.model('Registeruser',Registeruser)