const express = require('express');
const router = express.Router();
var { User } = require('../models/user');
var ObjectId = require ('mongoose').Types.ObjectId;

router.get('/',(req, res)=>{
   User.find()
   .then((docs)=>{ 
      res.status(200).send(docs);
   })
   .catch((err)=>{
      res.status(400).send(`Error Fetching User ${ JSON.stringify(err)}`)
   })
})

router.get('/:id',(req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        res.status(400).send(`No records found with the given Id ${req.params.id}`)
    else{
        User.findById({_id: req.params.id})
        .then(docs => res.status(200).send(docs))
        .catch(err => res.status(400).send(err))
    }
   
})

router.post('/',(req,res)=>{
    var user = new User(req.body);
    user.save()
    .then( docs =>{
       res.status(200).send(docs);
    })
    .catch(err =>{
        res.status(400).send(`Error saving user ${JSON.stringify(err)}`);
    })
});

router.put('/:id',(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No records found with given id ${req.params.id}`)
    else{
        
        User.findByIdAndUpdate({_id: req.params.id},{$set: req.body},{new:true},(err,docs)=>{
            if(!err)
                res.status(200).send(docs)
            else
                console.log(`Error in Updation ${JSON.stringify(err,undefined,2)}`);
        });
    }
});

router.delete('/:id',()=>{
    if(!ObjectId.isValid(req.params.id))
        res.status(400).send(`No records found with id ${req.params.id}`);
    else{
        User.findByIdAndRemove(req.params.id,(err,docs)=>{
            if(!err)
                res.send(docs)
            else
                res.send(`Error while deletion ${JSON.stringify(err,undefined,2)}`)
        })
    }
});


module.exports = router;
