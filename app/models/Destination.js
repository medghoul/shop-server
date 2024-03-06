const mongo= require('../common/dbConnection');
const Schema = mongo.mongoose.Schema;

const DestinationSchema = new Schema({
    id: {
        type: Number,
        primaryKey: true,
        autoIncrement: true,
    },
    client_id: {
        type: Number,
        required: true
    },
    destination_code: {
        type: String,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    province: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    user_id:{
        type: Number,
        required: true
    },
    client: {
        type: Schema.Types.ObjectId,
        ref: 'clients'
    }

}, {strict: true});

module.exports= mongo.mongoose.model('destinations', DestinationSchema);
