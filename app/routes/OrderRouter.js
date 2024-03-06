const express=require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuth = require('../common/middleware/is-auth');
const pagination = require('../common/pagination');
const Order = require('../models/Order');




module.exports = router;
