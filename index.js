const express = require('express');
const mongoose = require('mongoose');
const Product= require('./models/product.model.js')
const app = express();
const productRoute = require("./routes/product.routes.js")
//middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}))
//routes
app.use("/api/products", productRoute); 


app.get('/',(req,res)=>{
res.send('Hello world.I am adeja timilehin');
});

app.get('/api/products',async(req,res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
      res.status(500).json({message : error.message});  
    }
})
app.post('/api/products', async (req,res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
     } catch (error) {
         res.status(500).json({message : error.message});
     }
});
//update a product
app.get('/api/products/:id',async (req,res) =>{
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({message : error.message})
        
    }
});
//update a product
app.put('/api/products/:id', async (req,res)=>{
    try {
        const{id} = req.params;
       const product =  await Product.findByIdAndUpdate(id,req.body);
       if (!product) {
        return res.status(404).json({message: error.message});
      }
      const Updatedproduct = await Product.findById(id);
      res.status(200).json(Updatedproduct);
    } catch (error) {
      res.status(500).json({message: error.message })  
    }
})//delete a product

app.delete('/api/products/:id', async(req,res) =>{
    try {
const {id} = req.params;
 const product = await Product.findByIdAndDelete(id);
 if (!product) {
    return res.status(404).json({message: error.message});
  }
  res.status(200).json(product);

    } catch (error) {
        res.status(500).json({message:error.message});
    }
})



mongoose.connect('mongodb+srv://admin:00000000@cluster0.vlsvhx0.mongodb.net/node_api?retryWrites=true&w=majority&appName=Cluster0')
.then(() => {
console.log('Connected!');
app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})
})
.catch((err)=>{
    console.log(`${err}`)
})
