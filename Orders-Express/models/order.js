const mongoose = require('mongoose');

var Order = mongoose.model('Order',{
    'OrderNumber': {type: Number},
    'OrderDueDate': {type: String},
    'CustomerBuyerName': {type: String},
    'CustomerAddress': {type: String},
    'CustomerPhone': {type: Number},
    'OrderTotal': {type: Number}
});

module.exports = { Order }