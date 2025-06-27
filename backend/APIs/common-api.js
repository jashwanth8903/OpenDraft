const exp = require('express')
const commonAPI = exp.Router();

commonAPI.get('/common',(req,res)=>{
    res.send({message:'common api'})
})

module.exports = commonAPI;