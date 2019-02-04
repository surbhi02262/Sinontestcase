const User= require('../models/user')
const Services = require('../Services/security')
module.exports = function () {
    
    return {
        getUserInfo: function (req) {
            console.log("IN User Service", JSON.stringify(req.body))
            debugger;
            return new Promise((success, failure) => {
                debugger;
                User.findOne({
                    email:req.body.email,
                    password:req.body.password
                }, (err, response) =>{
                    debugger;
                    console.log("response :",response)
                    if(err){
                        debugger
                        failure({error: "Invalid username or password. Please try again"})
                     }
                     const token = Services.getUserInfoWithToken(response)
                     debugger;
                     success({token: `Bearer ${token}`, user:response})
                     
                })
                
                // .then(response => {
                    
                // })
                // .catch(err =>failure({error: json(err)}))
            }) 
            
        },
        updateUserInfo : function(req) {
            console.log("IN User Service", JSON.stringify(req.body))        
            debugger;
            return new Promise((success, failure) => {
                debugger;
                User.update({ _id: req._id }, { $set: req}, (err, response) => {
                    if(err) {
                        failure({error: "Update failed"})
                    } else {        
                     debugger;
                     success({response: response})
                    }
                })
                
            })
        },
        getUserById: (userId) => {
            return new Promise((resolve,reject) => {
                User.findById(userId, (err, res) => {
                    if(err) {
                        reject({error: "No User Found"})
                    } else {        
                     debugger;
                     resolve({user: res})
                    }
                })
            })
        },
        deleteUserInfo : (req) => {
            return new Promise ((resolve,reject) => {
                User.deleteOne({ _id: req._id },(err,res) => {
                    debugger
                    if(err){
                        debugger
                        reject({error: "not able to delete user"})
                    }else{
                        resolve({msg: "user deleted successfully"})
                    }
                })
            })
        }
    } 
    
}