let CustomerModel = require('../models/customer')
let express = require('express')
let router = express.Router();

//post
router.post('/customer', (req,res) => {
    debugger;
    if(!req.body){
        return res.status(400).send('req body is missing ')
    }
    let model = new CustomerModel(req.body)
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
//get
router.get('/customer', (req,res) => {
    if(!req.query.email){
        res.status(400).send('query email not available')
    }
    CustomerModel.findOne({
        email:req.query.email
    })
    .then(response => res.json(response))
    .catch(err => res.status(500).json(err))
})

//update
router.put('/customer' , (req,res) => {
    if(!req.query.email){
        res.status(400).send('query email not available')
    }
    CustomerModel.findOneAndUpdate({
        email:req.query.email
    }, req.body,{new:true})
    .then(response => res.json(response))
    .catach(err => res.status(500).json(err))
})
//delete
router.delete('/customer' , (req,res) => {
    if(!req.query.email){
        res.status(400).send('query email not available')
    }
    CustomerModel.findOneAndRemove({
        email:req.query.email
    })
    .then(response => res.json(response))
    .catach(err => res.status(500).json(err))
})
module.exports=router