const express=require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');
const pagination = require('../common/pagination');
const User = require('../models/User');
const {isAdmin, isAuth} = require("../common/middleware/is-auth");

router.post('/create', UserController.createUser);
router.get('/all',async (req, res, next) => {
    try {
        const totalItems = await User.countDocuments();
        pagination(totalItems)(req, res, next);

    } catch (error) {
        next(error);
    }
},async (req,res,next)=>{
    const startIndex = (req.pagination.currentPage - 1) * req.pagination.itemsPerPage;
    const endIndex = startIndex + req.pagination.itemsPerPage;
    const listUsers = await User.find().skip(startIndex).limit(req.pagination.itemsPerPage);
    res.json({
        pagination: req.pagination,
        items: listUsers,
    });
});
router.get('/get/:id', UserController.getUserById);
router.put('/update/:id',isAuth, UserController.updateUserById);
router.delete('/delete/:id', UserController.deleteUserById);
router.put('/verify/:id', UserController.verifyUserById);
router.put('/changePassword/:id', UserController.changePasswordUserById);
router.post('/sendSMS', UserController.sendSMS);
router.post('/auth', UserController.getToken);



module.exports = router;
