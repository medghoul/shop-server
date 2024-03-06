const express=require('express');
const router = express.Router();
const ArticleController = require('../controllers/ArticleController');
const isAuth = require('../common/middleware/is-auth');
const pagination = require('../common/pagination');
const Article = require('../models/Article');

router.post('/add', ArticleController.createArticle);
router.get('/get-all',pagination, ArticleController.getAllArticles);
router.get('/get/:id', ArticleController.getArticleById);


module.exports = router;
