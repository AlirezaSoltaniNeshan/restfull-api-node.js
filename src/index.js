require('../model/User');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const requireAuth = require('../middlewares/RequireAuth');
const app = express();
app.use(bodyParser.json());
app.use(authRoutes);

const mongUri='mongodb+srv://admin:passwordpassword@cluster0-nlubs.mongodb.net/test?retryWrites=true&w=majority';

mongoose.connect(mongUri,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected',()=>{
    console.log("You're connected!")
});
mongoose.connection.on('error',(err)=>{
    console.log("You're disconnect!",err)
});
const port=3000;
app.get('/', requireAuth, (req,res)=>{
    res.send(`Your email is ${req.user.email}`);
});

app.listen(port,()=>{
    console.log("Welcome with ",port);
});
