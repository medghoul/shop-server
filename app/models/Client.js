const mongo = require("../common/dbConnection");
const Schema = mongo.mongoose.Schema;

const ClientSchema = new Schema(
    {
        id: {
            type: Number,
            primaryKey: true,
            autoIncrement: true
        },
       company_name_client:{
              type: String,
                required: true
       },
       accounting_code:{
                type: String,
                required: true
       },
       company_name_accounting_client:{
                type: String,
                required: true
       },
       created_at:{
                type: Date,
                default: Date.now
       },
       updated_at:{
                type: Date,
                default: Date.now
       }

    }, {strict: true});

module.exports = mongo.mongoose.model('clients', ClientSchema)
