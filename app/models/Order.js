const mongo = require("../common/dbConnection");
const Schema = mongo.mongoose.Schema;

const OrderSchema = new Schema(
    {
       id: {
              type: Number,
                primaryKey: true,
                autoIncrement: true
       },
       destination_id:{
                type: Number,
                required: true
       },
       user_id:{
                type: Number,
                required: true
       },
       delivery_date:{
                type: Date,
                required: true
       },
       status:{
                type: String,
                required: true
       },
       note: {
                type: String,
                required: false
       },
       exported:{
                type: Boolean,
                required: true,
                default: false
       },
       created_at:{
                type: Date,
                default: Date.now
       },
       updated_at: {
                type: Date,
                default: Date.now
       },
       company_name:{
                type: String,
                required: true
       },
       canUserSeePrices: {
                type: Boolean,
                required: true
       },
        destination: {
           type: Schema.Types.ObjectId,
            ref: 'destinations'
        },
        order_products: [{
            type: Schema.Types.ObjectId,
            ref: 'products'
        }]

    }, {strict: true}
);

module.exports = mongo.mongoose.model('orders', OrderSchema)
