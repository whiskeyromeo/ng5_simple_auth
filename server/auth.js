const bcrypt = require('bcrypt-nodejs');
const jwt = require('jwt-simple');
const config = require('./.config');
var User = require('./models/User');
var express = require('express');
var router = express.Router();


function createSendToken(response, user) {
    var payload = { sub: user._id };
    var token = jwt.encode(payload, config.JWT_SECRET);
    response.status(200).send({ token })
}


router.post('/register', (req, res) => {
        let userData = req.body;
        var user = new User(userData);
        user.save(userData, (err, newUser) => {
            if (err)
                return res.status(500).send({ message: 'Registration Error' })
        
            createSendToken(res, newUser);
            
        })
    }
)

router.post('/login', async (req, res) => {
        let loginData = req.body;
        var user = await User.findOne({ email: loginData.email });

        if (!user) {
            return res.status(401).send({ message: 'Email or Password Invalid' })
        }

        bcrypt.compare(loginData.passwd, user.passwd, (err, isMatch) => {
            if (!isMatch) {
                return res.status(401).send({ message: 'Email or Password Invalid' })
            }
            createSendToken(res, user);
        })

    }
)


// Middleware to validate that a 
// user has access via the authorization header
function checkAuth(req, res, next) {
    if (!req.header('authorization')) {
        return res.status(401).send({ message: "Unauthorized: Missing auth header" });
    }

    // Get the token from the header --> we split on the space because of the 
    // method in which we store the token in the client (see authInterceptor.service.ts)
    var token = req.header('authorization').split(' ')[1];

    var payload = jwt.decode(token, config.JWT_SECRET);
    if (!payload) {
        return res.status(401).send({ message: "Unauthorized: Auth header Invalid" });
    }

    req.userId = payload.sub
    next()
}


var auth = {
    router,
    checkAuthenticated : checkAuth
}

module.exports = auth;