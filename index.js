require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");

const {PORT} = process.env;
const db = require("./db");
const constant = require("./constant");
const routes = require("./Routes/route")();

app.use(cors());
app.use(express.json());
app.use("/api/", routes);
app.all("*", (request, response) => {
    console.log(request.path, request.method)
    response.status(405).json({message: constant.INVALID_URL, code : 405})
});

db.connect(STATUS => {
    if(STATUS === constant.CONNETION_SUCCESS) {        
        app.listen(PORT, () => {
            console.log("Application Started", PORT)
        });
    } else {
        console.log("Database connection error");
        db.close();
        process.exit();
    }
});