const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = mongoose.model('User');

module.exports = (req,res,next)=>{
    const {authorization} = req.headers;

    if(!authorization){
        return res.status(401).send({error:'You must be logged in.'});
    }
    const token = authorization.replace('Bearer ','');
    
    jwt.verify(token,'MY_SECRET_KEY',async(err,payLoad)=>{
        if(err){
            return res.send({error:'You must be logged in.'});
        }
        const { userId } = payLoad;
        const user = await User.findById(userId);
        req.user = user;
        next();
    });
};
