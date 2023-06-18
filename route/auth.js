const express = require('express');
const authrouter = express.Router()
const {register,login}= require('../controller/auth')




authrouter.route('/register').post(register)
authrouter.route('/login').post(login)


module.exports = authrouter;