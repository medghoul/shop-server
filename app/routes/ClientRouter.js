const express=require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuth = require('../common/middleware/is-auth');
const pagination = require('../common/pagination');
const Client = require('../models/Client');




module.exports = router;
