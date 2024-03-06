const mongo= require("../common/dbConnection");
const Schema = mongo.mongoose.Schema;

const ProductSchema = new Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
    },
    product_description: {
        type: String,
        required: true
    },
    selected_unit: {
        type: String,
        required: true
    },
    unities: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
    price_single_product: {
        type: Number,
        required: false
    },
    pricing_unit: {
        type: String,
        required: false
    },
    note: {
        type: String,
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    },
    price_with_vat: {
        type: Number,
        required: true
    },
    article: {
        type: Schema.Types.ObjectId,
        ref: 'articles'
    }


}, {strict: true});

module.exports= mongo.mongoose.model('products', ProductSchema);
