let express =require('express');
let router = express.Router();
let albumController = require('../controller/albumController')
let AlbumSchema=require('../repository/albumRepository')
let Services = require('../Services/security')
// router.post("/add/images",function(req,res){
//     albumController.addImages(req,res)

// })

router.post('/add/images',Services.ensuretoken, (req,res) => {
    console.log('add images')
    if(!req.body){
        return res.status(400).send('req body is missing ')
    }
    console.log("In add Images")
    let model = new AlbumSchema(req.body)
    model.save()
    .then(response =>  {
        if(!response || response.length === 0){
           return  res.status(500).send(response)
        }
        res.status(201).send(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports=router