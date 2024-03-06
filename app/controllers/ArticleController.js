const Article = require('../models/Article');

const createArticle = async (req, res) => {
    console.log(req.body);
    try {
        const article = new Article(req.body);
        await article.save();
        res.status(200).json({message: 'Article created successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Error creating article'});
    }
}

const getAllArticles = async (req, res) => {
    try {
        const articles = await Article.find();
        res.status(200).json(articles);
    } catch (error) {
        res.status(400).json({error: 'Error getting articles'});
    }
}

const getArticleById = async (req, res) => {
    try {
        Article.findById(req.params.id, (err, article) => {
            if (err) {
                res.status(400).json({error: 'Error getting article'});
            } else {
                res.status(200).json(article);
            }
        });
    } catch (error) {
        res.status(400).json({error: 'Error getting article'});
    }
}

module.exports = {
    createArticle,
    getAllArticles,
    getArticleById
}
