const express = require('express');
const router = express.Router();
var { Order } = require('../models/order.js');
var ObjectId = require('mongoose').Types.ObjectId;

/* All Order Routes */ 
router.get('/',(req,res)=>{
    Order.find()
   .then(docs => res.status(200).send(docs))
   .catch(err => console.log(`Error while Fetching orders ${err}`))
})

router.post('/',(req, res)=>{
    var order = new Order(req.body);
    order.save()
    .then(docs => res.status(200).send(docs))
    .catch(err => { res.send(`Error while saving order ${JSON.stringify(err)}`) })
})

router.put('/:id',async(req,res)=>{
    if(!ObjectId.isValid(req.params.id))
        res.send(`No records found with the given id ${req.params.id}`) 
    try{
        var docs = await Order.findByIdAndUpdate({_id: req.params.id},{$set: req.body},{new: true})
        res.status(200).send({message: "Updated Successfully !", data: docs})
    }
    catch(e){
        res.status(400).send(e);
    } 

})

router.delete('/:id',(req, res)=>{
    if(!ObjectId.isValid(req.params.id))
        res.send(`No records found with the given id ${req.params.id}`)
    Order.findByIdAndRemove(req.params.id)
    .then(docs => { res.status(200).send({message: "successfully deleted !", data: docs})})
    .catch(err => res.status(400).send(`${JSON.stringify(err)}`)) 
})

module.exports = router;