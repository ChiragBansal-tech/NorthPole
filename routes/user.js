const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

const saltRounds = 10;
const otps = new Map();


router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try{
        const user = await User.findOne({ email });

        if(!user){
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(401).json({ message: 'Invalid credentials'});
        }

        req.session.user = {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            address: user.address,
            phoneNo: user.phoneNo,
            role: user.role
        };

        return res.status(200).json({ message: 'Login Successful', user: req.session.user });
    }
    catch(error){
        return res.status(500).json({ error: 'Error during login', details: error.message })
    }
});


router.post('/logout', (req, res) => {

    req.session.destroy((err) => {  
        if (err) {
            return res.status(500).json({ message: 'Logout failed', error: err.message });
        }
        res.clearCookie('connect.sid', { path: '/' });
        return res.status(200).json({ message: 'Logout successful' });
    });
});

router.post('/signup', async(req, res) => {
    const { firstName, lastName, email, password, address, phoneNo } = req.body;
    try{
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            address,
            phoneNo,
            password: hashedPassword,
        });

        // const otp = crypto.randomInt(1000, 9999).toString();
        // otps.set(newUser._id.toString(), { otp, expireAt: Date.now() +5*60*1000});

        // const transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         user: 'chiragbansal.designoweb@gmail.com',
        //         pass: 'Chirag@123'
        //     }
        // });

        // const mailOptions = {
        //     from: 'chiragbansal.designoweb@gmail.com',
        //     to: newUser.email,
        //     subject: 'OTP verification',
        //     text: `Your OTP is ${otp} `,
        // }
        // await transporter.sendMail(mailOptions);

        return res.status(201).json({ message: 'User created successfully' });
    }
    catch(error){
        return res.status(500).json({ error: 'Error createing user', details: error.message });
        
    }
});

router.post('/verify-otp', async(req, res) => {
    const { userId, otp } = req.body;

    const savedOtp = otps.get(userId);
    if(!savedOtp || savedOtp.otp !== otp){
        return res.status(400).json({ message: 'Incorrect OTP' });
    }

    if(Date.now() > savedOtp.expiresAt){
        await User.findByIdAndDelete(userId);
        otps.delete(userId);
        return res.status(400).json({ message: 'OTP expired! '});
    }

    otps.delete(userId);
    res.status(200).json({ message: 'Account created succesfully. Redirecting to login'})
})

router.patch('/update/:id', async(req, res) => {
    const userId = req.params.id;
    const { email, address, phoneNo } = req.body;

    try{
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email, address, phoneNo },
            { new: true, runValidators: true }
        );

        if(!updatedUser){
            return res.status(404).json({ error: 'User not found'});
        }
        return res.status(200).json(updatedUser);
    }
    catch(error){
        return res.status(500).json({ error: 'Error updating User', details: error.message });
    }
});

router.delete('/delete/:id', async (req, res) => {
    const userId = req.params.id;

    try{
        const deletedUser = await User.findByIdAndDelete(userId);

        if(!deletedUser){
            return res.status(404).json({ error: 'User not Found' });
        }

        return res.status(200).json({ message: 'User delted successfully', user: deletedUser });
    }
    catch(error){
        return res.status(500).json({ error: 'Error deleteing User', details: error.message });
    }
});

module.exports = router;