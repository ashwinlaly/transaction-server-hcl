require("dotenv").config()

const { DB_HOST, 
        DB_NAME } = process.env

module.exports = {
    database : {
        db_url : `mongodb://${DB_HOST}/${DB_NAME}`,
        mongoose_config : {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        }
    }
}