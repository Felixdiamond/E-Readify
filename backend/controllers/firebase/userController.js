const asyncHandler = require("express-async-handler");
const customUser = require("../models/customUser");
const bcrypt = require("bcrypt");

const registerUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;


module.exports = { registerUser, currentUser };