const mongo = require("../common/dbConnection");
const Schema = mongo.mongoose.Schema;

const CartSchema = new Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true
    },
    destination_id: {
        type: Number,
        required: true
    },
    user_id: {
        type: Number,
        required: true
    },
    delivery_date: {
        type: Date,
        required: true
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
    destination:{
        type: Schema.Types.ObjectId,
        ref: 'destinations'
    },
    cart_products: [{
        type: Schema.Types.ObjectId,
        ref: 'products'
    }]

}, {strict: true});

module.exports = mongo.mongoose.model('carts', CartSchema)
