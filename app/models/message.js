const mongo = require("../common/dbConnection");
const Schema = mongo.mongoose.Schema;

const AddressSchema = new Schema(
    {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true
        },
        user_id:{
            type: Number,
            required: true
        },
        client_id: {
            type: Number,
            required: true
        },
        destination_code: {
            type: String,
            required: true
        },
        text:{
            type: String,
            required: false
        },
        seen: {
            type: Boolean,
            required: true
        },
        created_at: {
            type: Date,
            default: Date.now
        },
        updated_at: {
            type: Date,
            default: Date.now
        }
    }, {strict: true}
);

module.exports = mongo.mongoose.model('messages', AddressSchema)
