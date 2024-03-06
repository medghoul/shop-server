const express=require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const isAuth = require('../common/middleware/is-auth');
const pagination = require('../common/pagination');
const Message = require('../models/Message');




module.exports = router;
