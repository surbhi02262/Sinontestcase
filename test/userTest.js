const assert = require('chai').assert;
const sinon = require('sinon');
const request = require('request')
const user_route = require('./../src/routes/user-route')
const User = require('../src/models/user')
const UserService = require('../src/Services/User')
const Services = require('../src/Services/security')
fakeOrderResponse = 'pankaj'
updateOrderResponse = (userId) => {
    return new Promise((resolve,reject) => {
        resolve({_id:userId,password:"4545"})
    })
}
function findOne (err, resp){
   return Promise.resolve(resp)
}

describe('user-route',function(){
    before(function () {
        findstub =  sinon.stub(User, 'findOne')
        tokenstub=  sinon.stub(Services, 'getUserInfoWithToken')
        deletestub = sinon.stub(User,'deleteOne')
        updatestub = sinon.stub(User,'update')
    }); 
    it('finding one user',function(done){
        tokenstub.callsFake(function fakeFn() {
            return 'token-val';
        });
        findstub.yields(undefined, fakeOrderResponse)
        debugger
        UserService()
        .getUserInfo({body:{email: "email", password: "password"}})
        .then((resp)=> {
            debugger
            console.log("findOne", resp)
            debugger;
                assert.equal(resp, {token: 'Bearer token-val', user: 'pankaj'});

            if(resp) {
                done();
            }
            
        }).catch(err => done())
    })
    it('user not found',function(){
        findstub.yields(true,undefined)
        debugger
        UserService().getUserInfo({body: {email:"emal",password:"pass"}})
        .then((res) => { debugger})
        .catch(err =>{
            debugger
            assert.equal(err,{error: "Invalid username or password. Please try again"})
            return expect(res);
        })

    })
    it('delete user',function(done){
        deletestub.yields(undefined,"user deleted successfully")
        debugger
        UserService().deleteUserInfo({body: {_id: "765"}})
        .then(res => {
            debugger
            assert.equal(res,{msg:"user deleted successfully"})
            if(res){
                debugger
                done()
            }
        })
        .catch(err => done())
    })
    it('delete user error',function(){
        deletestub.yields(true,undefined);
        UserService().deleteUserInfo({body: {_id: "88"}})
        .then(response => {})
        .catch(err => {
            debugger
            assert.equal(err,{error: "not able to delete user"})
        })

    })
    it('update user',function(){
        let x = updateOrderResponse(("5c3ab04843646f8083940df7"))
        console.log(x)
        updatestub.yields(undefined, x)
        debugger
        UserService().updateUserInfo({body:{_id:"5c3ab04843646f8083940df7"}})
        .then(x => x)
        .then(xresult => 
            assert.equal(xresult, {_id:userId,password:"4545"})
        )
        .catch(err => err)
    })
    
    after(function () {
        findstub.restore();
        tokenstub.restore();
        deletestub.restore();
    });
})

