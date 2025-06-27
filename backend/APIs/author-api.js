//create author-api app
const exp = require('express')
const authorApp = exp.Router();
const bcryptjs = require('bcryptjs');
const expressAsyncHandler = require('express-async-handler')
const verifyToken = require('../Middlewares/verifyToken');
require('dotenv').config()

//import jwt
const jwt = require('jsonwebtoken')


let authorscollection;
let articlescollection;
//get usercollection app
authorApp.use((req, res, next) => {
    authorscollection = req.app.get('authorscollection')
    articlescollection = req.app.get('articlescollection')
    next()
})

//author registration route
authorApp.post('/author', expressAsyncHandler(async (req, res) => {
    //get user resource from client
    const newUser = req.body;
    //check for duplicate user based on username
    const dbuser = await authorscollection.findOne({ username: newUser.username })
    //if user exist
    if (dbuser != null) {
        res.send({ message: 'user already exist' })
    } else {
        //hash the password
        const hashedPassword = await bcryptjs.hash(newUser.password, 3)
        //update the user resource with hashed password
        newUser.password = hashedPassword
        //insert the new user
        await authorscollection.insertOne(newUser)
        //send res
        res.send({ message: 'user created' })
    }
}))

//author login route
authorApp.post('/login', expressAsyncHandler(async (req, res) => {
    //get user resource from client
    const userCred = req.body;
    console.log(userCred);
    //find the user based on username
    const dbuser = await authorscollection.findOne({ username: userCred.Username })
    //if user not found
    if (dbuser == null) {
        res.send({ message: 'user not found' })
    } else {
        //check for password
        const status = await bcryptjs.compare(userCred.Password, dbuser.password)
        if (status === false) {
            res.send({ message: 'invalid password' })
        } else {
            //create jwt token and encode it
            const signedToken = jwt.sign({ username: dbuser.username }, process.env.SECRET_KEY, { expiresIn: '1d' })
            //send res
            res.send({ message: 'login success', token: signedToken, user: dbuser })
        }
    }
}))

//adding new article by author
authorApp.post('/article',verifyToken, expressAsyncHandler(async (req, res) => {
    //get new article from client
    const newArticle = req.body;
    //post to articles collection
    let r = await articlescollection.insertOne(newArticle)
    console.log(r)
    //send res
    res.send({ message: "new article created" })
}))

//updating the article
authorApp.put('/article',verifyToken, expressAsyncHandler(async (req, res)=>{
    //get updated article from client
    const modifiedArticle = req.body;
    //update the article
    let result = await articlescollection.updateOne({articleId:modifiedArticle.articleId},{$set:{...modifiedArticle}})
    let latestArticle = await articlescollection.findOne({articleId:modifiedArticle.articleId})
    console.log(result)
    res.send({message:"Article updated", article:latestArticle})

}))

//deleting the article
authorApp.put('/article/:articleId',verifyToken, expressAsyncHandler(async (req, res)=>{
    //get articleId from url
    const articleIdFromUrl = (+req.params.articleId);
    //get article
    const articleToDelete = req.body;
    //update states of article to false
    await articlescollection.updateOne({articleId:articleIdFromUrl},{$set:{...articleToDelete,status:false}})
    res.send({message:"Article deleted"})

}))

// Restoring the article
authorApp.put('/restore-article/:articleId', verifyToken, expressAsyncHandler(async (req, res) => {
    // get articleId from URL
    const articleIdFromUrl = (+req.params.articleId);
    //get article
    const articleToDelete = req.body;
    // update status of article to true
    let r = await articlescollection.updateOne({ articleId: articleIdFromUrl }, { $set: {...articleToDelete, status: true } });
    console.log(r)
    res.send({ message: "Article restored" });
}));


//view the author articles
authorApp.get('/article/:username',verifyToken, expressAsyncHandler(async(req, res)=>{
    //get username from url
    const authorName = req.params.username
    console.log(authorName)
    //get articles whose status is true
    const articlesList = await articlescollection.find({username:authorName}).toArray();
    res.send({message:"List of articles",payload:articlesList})
    console.log(articlesList)
}))

module.exports = authorApp;