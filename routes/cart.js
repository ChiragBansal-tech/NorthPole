const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.post('/add-to-cart', async (req, res) => {
    const { userId, productId, quantity } = req.body;

    try{
        const user = await User.findById(userId);
        
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        const productExists = user.cart.find(item => item.productId.toString() === productId);

        if(productExists){
            productExists.quantity += quantity;
        }
        else{
            user.cart.push({ productId, quantity });
        }

        await user.save();
        return res.status(200).json({ message: 'Product added to cart', cart: user.cart })
    }
    catch(error){
        return res.status(500).json({ error: 'Error adding product to cart', details: error.message })
    }
});

router.get('/cart/:userId', async (req, res) => {
    const userId = req.params.userId;

    try{
        const user = await User.findById(userId).populate('cart.productId');
        console.log(user, 'user')
        if(!user){
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json({ cart: user.cart });
    }
    catch(error){
        return res.status(500).json({ error: 'Error fetching cart', details: error.message})
    }
});

router.delete('/remove-from-cart', async (req, res) => {
    const { userId, productId } = req.body;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const productIndex = user.cart.findIndex(item => item.productId.toString() === productId);

        if (productIndex === -1) {
            return res.status(404).json({ message: 'Product not found in cart' });
        }

        user.cart.splice(productIndex, 1);

        await user.save();
        return res.status(200).json({ message: 'Product removed from cart', cart: user.cart });
    } catch (error) {
        return res.status(500).json({ error: 'Error removing product from cart', details: error.message });
    }
});


module.exports = router;