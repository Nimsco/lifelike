const userModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const registerUser = async(req, res) => {
    try {
        const { username, email, password, dob , gender } = req.body;
        