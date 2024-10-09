const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    proname: { type: String, required: true },
    price: { type: Number, required: true },
    avatar: { type: String, required: true },
    id: { type: String },
    content: { type:String, reqired:true }
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
