//create admin-api app
const exp = require('express')
const adminApp = exp.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler')
require('dotenv').config()

//import jwt
const jwt = require('jsonwebtoken')


let usercollection;
//get usercollection app
adminApp.use((req, res, next) => {
    usercollection = req.app.get('usercollection')
    next()
})

//admin login route
adminApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const userCred = req.body;
    //find the user based on username
    const dbuser = await usercollection.findOne({username:userCred.username})
    //if user not found
    if(dbuser== null){
        res.send({message:'user not found'})
    }else{
        //check for password
        const status = await bcryptjs.compare(userCred.password,dbuser.password)
        if(status===false){
            res.send({message:'invalid password'})
        }else{
            //create jwt token and encode it
            const signedToken = jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:20})
            //send res
            res.send({message:'login success',token:signedToken,user:dbuser})
        }
    }
}))

//get articles of all users
adminApp.get('/articles',expressAsyncHandler(async(req,res)=>{
//get articlescollection from express app
const articlescollection = req.app.get('articlescollection')
//get all articles
let articlesList = await articlescollection.find().toArray()
//send res
res.send({message:"articles",payload:articlesList})
}))

module.exports = adminApp;