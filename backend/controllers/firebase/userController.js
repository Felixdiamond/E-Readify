const asyncHandler = require("express-async-handler");
const customUser = require("../models/customUser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName, avatarUrl } = req.body;
    const user = new customUser(email, password, firstName, lastName, avatarUrl);
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.status(201).json({ token });
});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = new customUser(email, password);
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });
    res.status(200).json({ token });
});

const currentUser = asyncHandler(async (req, res) => {
    const { email } = req.user;
    const user = new customUser(email);
    res.status(200).json({ user });
});

module.exports = { registerUser, loginUser, currentUser };