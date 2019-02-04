let mongoose = require('mongoose')
// const server =''
// const database='rest-api'
// const user='surabhi'
// const password='sur123bhi@'
// mongoose.connect('mongodb://${user}:${password}@${server}/${database}')

let UserSchema= mongoose.Schema({
    firstName:{
        type:String,
        require:true,
    },
    surName:String,
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:String,
    gender:String
    
})
module.exports=mongoose.model('user',UserSchema)