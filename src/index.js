let express = require('express');
let app = express();
let bodyParser = require('body-parser')
let path = require('path')
let cors = require('cors')
let session = require('express-session')
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/customer', {useNewUrlParser: true})
let db = mongoose.connection;

db.once('open',function(){
    console.log('connected to mongodb')
})

db.on('error',function(err){
    console.log(err)
})
// Middleware
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())
//app.use(cors)
app.use(session({secret:"asdfghjkl",resave:false,saveUninitialized:true}))
app.use((req,res,next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
// Routes
let personRoute = require('./routes/person')
let customer = require('./routes/customerroutes')
let userRoute=require('./routes/user-route')
let albumRoute=require('./router/album')
app.use(personRoute);
app.use(customer);
app.use(userRoute);
app.use(albumRoute);



//handler for 404 not found , resource not found
app.use((req,res) => {
    res.status(404).send('error handler ') 
})
app.use((err,req,res,next) => {
    console.error("fffff : ",err.stack)
    res.sendFile(path.join(__dirname,'../public/500.html'))
})
app.use(express.static('public'))
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.info(`Server has started on port ${PORT}`))