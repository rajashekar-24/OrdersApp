const express = require('express');
const router  = express.Router();
const { User } = require('../models/user');
var jwt = require('jsonwebtoken');
 
/* Login Check */

router.post('/login',(req, res)=>{
     
    // User.findOne({email: req.body.email, password: req.body.password},(err, User)=>{
    User.findOne({email: req.body.email},(err, User)=>{

        if(err)
            return res.status(500).send({message: 'Server Error '});
        else if(!User)
            return res.status(401).send({message:'Invalid Credentials !'});
        else if(req.body.password !== User.password);
        else{
            /* If user exists assign token */
            var token = jwt.sign({ id: User._id, email: User.email},'secret',{ expiresIn: '2h'});
            res.status(200).send({ auth: true, userId: User._id, token: token});
        }
        
    })
});

/* Logout */

router.get('/logout',(req, res)=>{
    res.status(200).send({ auth: false, token: null});
})


module.exports = router;