const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const dotenv = require('dotenv').config();

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            // console.log("token taken "+token);
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
            // console.log(decoded);
            const curr_user = await User.findById(decoded.user.id);
            // console.log("user fetched "+curr_user);
            // if(curr_user !== NULL && curr_user != undefined){
                req.body.user_id = curr_user._id;
            // }
            //console.log("token next");
            next();
        } catch (error) {
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
});

module.exports = { protect };
