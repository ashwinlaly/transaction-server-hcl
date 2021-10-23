require("dotenv").config();

const config = require('./config');
const mongoose = require("mongoose");
const constant = require("./constant");

module.exports = {
    connect : callback => {
        const url = config.database.db_url;
        const mongoose_config = config.database.mongoose_config;
        mongoose.connect(url, mongoose_config, (err, conn) => {
            if(err) {
                console.log("Database Error...", err);
                callback(constant.CONNETION_ERROR);
            } else {
                _db = conn
                console.log("Database connection sucess...");
                callback(constant.CONNETION_SUCCESS);
            }
            return;
        })
    },
    close : () => {
        mongoose.disconnect();
    }
}