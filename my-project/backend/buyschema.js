const mongoose = require('mongoose');

const buySchema = new mongoose.Schema({
    name: { type: String, required: true },
    number: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    itemId : { type: String }
});

const Item = mongoose.model('Buy', buySchema);
module.exports = Item;
