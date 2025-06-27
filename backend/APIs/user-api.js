//create user-api app
const exp = require('express')
const userApp = exp.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler')
const verifyToken = require('../Middlewares/verifyToken');
require('dotenv').config()

//import jwt
const jwt = require('jsonwebtoken')


let usercollection;
let articlescollection;

//get usercollection app
userApp.use((req, res, next) => {
    usercollection = req.app.get('usercollection')
    articlescollection = req.app.get('articlescollection')
    next()
})

//user registration route
userApp.post('/user',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const newUser = req.body;
    //check for duplicate user based on username
    const dbuser = await usercollection.findOne({username:newUser.username})
    //if user exist
    if(dbuser!= null){
        res.send({message:'user already exist'})
    }else{
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password, 3)
        //update the user resource with hashed password
        newUser.password = hashedPassword
        //insert the new user
        await usercollection.insertOne(newUser)
        //send res
        res.send({message:'user created'})
    }
}))

//user login route
userApp.post('/login',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const userCred = req.body;
    //find the user based on username
    console.log(userCred)
    const dbuser = await usercollection.findOne({username:userCred.Username})
    //if user not found
    if(dbuser===null){
        res.send({message:'user not found'})
    }else{
        //check for password
        const status = await bcryptjs.compare(userCred.Password,dbuser.password)
        console.log(status)
        if(status===false){
            res.send({message:'invalid password'})
        }else{
            //create jwt token and encode it
            const signedToken = jwt.sign({username:dbuser.username},process.env.SECRET_KEY,{expiresIn:'1d'})
            //send res
            res.send({message:'login success',token:signedToken,user:dbuser})
        }
    }
}))

//get articles of all users
userApp.get('/articles',verifyToken,expressAsyncHandler(async(req,res)=>{
//get articlescollection from express app
const articlescollection = req.app.get('articlescollection')
//get all articles
let articlesList = await articlescollection.find({status:true}).toArray()
//send res
res.send({message:"articles",payload:articlesList})
}))

//post comments for an article by article id
userApp.post('/comment/:articleId',verifyToken,expressAsyncHandler(async(req,res)=>{
    //get user comment obj
    const userComment = req.body;
    const articleIdFromUrl = (+req.params.articleId);
    //insert userComment pbject to comments array of article by id
    let result = await articlescollection.updateOne({articleId:articleIdFromUrl},{$addToSet:{comments:userComment}})
    res.send({message:"comment posted"})
}))


module.exports = userApp;