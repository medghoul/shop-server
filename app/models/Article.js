const mongo = require('../common/dbConnection');
const Schema = mongo.mongoose.Schema;

const ArticleSchema = new Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
    },
    category_article_id: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    species_code: {
        type: Number,
        required: true
    },
    vat: {
        type: Number,
        required: true
    }
}, {strict: true});

module.exports = mongo.mongoose.model('articles', ArticleSchema);
