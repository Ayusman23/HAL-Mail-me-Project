const mongoose = require('mongoose');

const userSchema=mongoose.Schema({
    username:{
        type:'string',
        required:[
            true,
            "Please enter an username"
        ]
    },
    email:{
        type:'string',
        required:[
            true,
            "Please enter an email address"
        ],
        unique:[true,"Email is already in use"]

    },
    password:{
        type:'string',
        required:[
            true,
            "Please enter a password"
        ]
    },
    

},{
    timestamp:true
})

module.exports=mongoose.model('User',userSchema);