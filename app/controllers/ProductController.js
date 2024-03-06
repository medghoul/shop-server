const Product = require('../models/Product');

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(200).json({message: 'Product created successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Error creating product'});
    }
}

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(400).json({error: 'Error getting products'});
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Error getting product'});
    }
}

const updateProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({message: 'Product not found'});
        }
        product.name = req.body.name;
        product.description = req.body.description;
        product.selected_unit = req.body.selected_unit;
        product.unities = req.body.unities;
        product.price = req.body.price;
        product.quantity = req.body.quantity;
        product.price_single_product = req.body.price_single_product;
        product.pricing_unit = req.body.pricing_unit;
        product.note = req.body.note;
        product.price_with_vat = req.body.price_with_vat;
        product.article = req.body.article;
        product.updated_at = Date.now();
        await product.save();
        res.status(200).json({message: 'Product updated successfully'});
    } catch (error) {
        console.log(error);
        res.status(400).json({error: 'Error updating product'});
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById
}
