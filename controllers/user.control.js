const User = require('../models/users.model');

// get all users
const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({ users });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// create user
const createUser = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(403).json({ message: 'user already exist!' });
        }
        user = await User.findOne({username: req.body.username});
        if (user) {
            return res.status(403).json({ message: 'username is already taken!' });
        }
        const newUser = await User.create(req.body);
        res.status(201).json({ message: 'user created!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// update user
const updateUser = async (req, res) => {
    try {
        let existUser = await User.findOne({ _id: {$ne: req.params.id},  email: req.body.email });
        if (existUser) {
            return res.status(403).json({ message: 'user already exist!' });
        }
        existUser = await User.findOne({ _id: {$ne: req.params.id},  username: req.body.username });
        if (existUser) {
            return res.status(403).json({ message: 'username is already taken!' });
        }
        const user = await User.findOne({ _id: req.params.id });
        if (req.body.username) {
            user.username = req.body.username;
        }
        if (req.body.email) {
            user.email = req.body.email;
        }
        if (req.body.phone) {
            user.phone = req.body.phone;
        }
        await user.save();
        res.status(200).json({ message: 'user updated!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// delete user
const deleteUser = async (req, res) => {
    try {
        const status = await User.deleteOne({ _id: req.params.id });
        console.log(status);
        res.status(200).json({ message: 'user deleted!' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = { getAllUser, createUser, updateUser, deleteUser };