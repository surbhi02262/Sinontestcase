let mongoose = require('mongoose')
// const server =''
// const database='rest-api'
// const user='surabhi'
// const password='sur123bhi@'
// mongoose.connect('mongodb://${user}:${password}@${server}/${database}')

let CustomerSchema= mongoose.Schema({
    name:String,
    email:{
        type:String,
        require:true,
        unique:true
    }
})
module.exports=mongoose.model('customer',CustomerSchema)