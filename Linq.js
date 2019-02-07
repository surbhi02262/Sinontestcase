let UserModel = require('../models/user')
let express = require('express')
let router = express.Router();
let jwt = require('jsonwebtoken')
let Services = require('../Services/security')
const USerService = require('../Services/User')
var LINQ = require('node-linq').LINQ;
var path = require('path');
//post
router.post('/user/signup', (req,res) => {
    debugger;
    if(!req.body){
        return res.status(400).send('req body is missing ')
    }
    let model = new UserModel(req.body)
    model.save()
    .then(response =>  {
        if(!response || response.length === 0){
           return  res.status(501).send(response)
        }
        res.status(201).send(response)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

router.get('/reset',Services.ensuretoken,(req,res) => {
    res.json(req.user)
     
})

function promises (files) {
    return new Promise((resolve,fail)=> {
       resolve(new LINQ(files)
          .Where(function(file) { return file.gender === 'Female'; })
          .Select(function(file) { return file.firstName})
          .OrderBy(function(file) { return file})
          .ToArray())
    })
}

router.get('/getalluser',(req,res) => {
    UserModel.find()
    .then((resp) => {
        //res.send(resp)
        return promises(resp)

    }).then(resps => res.send(resps))
    .catch((err) => res.send(err))
     
})
router.get('/getUserById/:_id',(req,res) => {
    console.log(req.params)
    let promise = USerService().getUserById(req.params)
    console.log(promise)
    promise.then((response) => res.send(response))
    .catch(err => res.send(err))
})
router.put('/updateUser', (req,res) => {
    console.log("req", JSON.stringify(req.body))
 //   let userPromise = USerService().getUserById({_id: req.body._id})
 //   userPromise.then((response) => console.log(response))
    let promise = USerService().updateUserInfo(req.body)
    console.log(promise)
    promise.then((response) => res.send(response))
    .catch(err => res.send(err))
})

router.delete('/deleteUser',(req,res) => {
    console.log('req is',JSON.stringify(req.body))
    let promise = USerService().deleteUserInfo(req.body)
    promise.then((response) => res.send(response))
    .catch(err => res.send(err))
})
//post
router.post('/getUser', (req,res) => {
    if(!req.session.user && !req.body){
        return res.status(400).send('req body is missing ')
    }
    console.log("req", JSON.stringify(req.body))
    let promise = USerService().getUserInfo(req)
    console.log(promise)
    promise.then((response) => res.send(response))
    .catch(err => res.send(err))
})

router.post('/api/login',function(req,res){
    const token = jwt.sign(req.body,"my_secret_key");
    res.json({
        token:token
    })
} )
router.get('/api/protected',Services.ensuretoken,function(req,res){
    jwt.verify(req.token,'my_secret_key',function(err,data){
        if(err){
            res.sendStatus(403)
        }else{
            res.json({
                text:"this is protected",
                data:data
            })
        }
    })
})

router.get('/reset/user',Services.ensuretoken,(req,res) => {

})

module.exports=router
