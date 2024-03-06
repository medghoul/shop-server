// rewrite this model as a mongoose schema
const mongo= require('../common/dbConnection');
const Schema = mongo.mongoose.Schema;

const UserSchema = new Schema({
    // Model attributes are defined here
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },

    name: {
        type: String,
    },
    lastname: {
        type: String,
    },

    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    confirm_code: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    verification_code_change_password: {
        type: String,
        required: false
    },
    privacy: {
        type: Number,
        required: true
    },
    isUserVerified: {
        type: Boolean,
        default: false
    }
}, {strict: true});


module.exports = mongo.mongoose.model('users', UserSchema);
