const express = require('express');
const mongoose = require('mongoose');
const Item = require('./schema');
const Buy = require('./buyschema')
const cors = require('cors');
const Contact = require('./contactschema')
let myid;

const app = express();
app.use(express.json()); // Replace bodyParser with express.json()
app.use(cors())


mongoose.connect("mongodb+srv://Parmarvishal:Vjp0458@cluster0.6mwax.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

//get all
app.get('/', async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//get by id
app.get('/items/:id', async (req, res) => {
    try {
        const item = await Item.findOne({id:req.params.id});
        myid = req.params.id;
        res.send(item);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//to Buy product
app.post('/items/:id/form', async (req, res) => {
    try {
        const neworder = new Buy(req.body);
        neworder.itemId = myid;
        await neworder.save();
        res.json({ item: neworder });
    } catch (error) {
        res.status(500).json({ message: 'Error adding order : ', error });
    }
});

//add new product
app.post('/', async (req, res) => {
    try {
        const items = await Item.find();
        const newItem = new Item(req.body);
        let maxId = parseInt(items[items.length-1].id);
        for(let i=0;i<items.length;i++){
            if(maxId<parseInt(items[i].id)){
                maxId = parseInt(items[i].id);
            }
        }
        newItem.id = maxId +1;
        await newItem.save();
        res.json({ item: newItem });
    } catch (error) {
        res.status(500).json({ message: 'Error adding item', error });
    }
});

//show orders
app.get('/orders', async (req, res) => {
    try {
        const items = await Item.find();
        const orders = await Buy.find();
        const matchedItems = items.filter(item => 
            orders.some(order => order.itemId === item.id)
        );
        res.json(matchedItems);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//contact
app.post('/contact', async (req,res) => {
    try {
        const newcontact = new Contact(req.body);
        await newcontact.save();
        res.json({ item: newcontact });
    } catch (error) {
        res.status(500).json({ message: 'Error adding order : ', error });
    }
});

//delete
app.delete('/admin/items/:id',async (req,res)=>{
    const ans = await Item.deleteOne({id:req.params.id});
    res.send(ans);
});

//edit
app.put('/items/:id',async (req,res)=>{
    const item = await Item.findOne({id:req.params.id});
    item.proname = req.body.proname;
    item.price = req.body.price;
    item.avatar = req.body.avatar;
    item.content = req.body.content;
    const ans = await item.save();
    res.send(ans);
});

const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
