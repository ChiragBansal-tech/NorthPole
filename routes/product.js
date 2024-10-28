const express = require('express');
const Product = require('../models/products'); 
const storage = require('../utils/common');
const multer = require('multer');
const router = express.Router();

const upload = multer({ storage: storage });

router.post('/create', upload.single('productImage'), async (req, res) => {
    const  { productName, productDescription, price, quantity, manufacturingDate, color, type } = req.body;
    const productImage = req.file ? req.file.filename : null;
    try{
        const newProduct = await Product.create({
            productName,
            productImage,
            productDescription,
            price,
            quantity,
            manufacturingDate,
            color,
            type,
        });
        return res.status(201).json(newProduct);
    }
    catch(error){
        return res.status(500).json({ error: 'Error creating Product', details: error.message});
    }
});

router.get('/list', async (req, res) => {
    try{
        const products = await Product.find();
        return res.status(200).json(products);
    }
    catch(error){
        return res.status(500).json({ error: 'Error fetching products', details: error.message });
    }
});

router.get('/productdetails/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        return res.status(200).json(product);
    } 
    catch (error) {
        return res.status(500).json({ error: 'Error fetching product details', details: error.message });
    }
});

router.patch('/update/:id', async(req, res) => {
    const productId = req.params.id;
    const updates = req.body;

    try{
        const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
        if(!updatedProduct){
            return res.status(404).json({ error: 'Product not found' });
        }
        return res.status(200).json(updatedProduct);
    }
    catch(error){
        return res.status(500).json({ error: "Error updating product", details: error.message });
    }
});

router.delete('/delete/:id', async(req, res) => {
    const productId = req.params.id;

    try{
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if(!deletedProduct){
            return res.status(404).json({error: 'Product not found'});
        }
        return res.status(200).json({ message: 'Product deleted successfuly', product: deletedproduct });
    }
    catch(error){
        return res.status(500).json({ error: 'Error deleting product', details: error.message });
    }
});

module.exports = router;