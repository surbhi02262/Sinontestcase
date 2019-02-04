const mongoose = require('mongoose')

let AlbumSchema= mongoose.Schema({
    albumName:String,
    ImageUrl:String,
    CreatedDate:Date,
    category:String,
    ImageName:String

})

module.exports =mongoose.model('album',AlbumSchema)