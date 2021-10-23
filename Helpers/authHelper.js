require("dotenv").config();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Mongoose = require("mongoose");

const constants = require("../constant");

const hashPassword = async (pass) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const password = await bcrypt.hash(pass, salt);
        return password;
    } catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

const accessToken = async (payload) => {
    try {
        let {ACCESS_TOKEN_SECRET} = process.env;
        let access_token = await jwt.sign(payload, ACCESS_TOKEN_SECRET);
        return access_token;
    } catch(err) {
        console.log(err);
        throw new Error(err);
    }
}

const verifyToken = async (req, res, next) => {
    let {ACCESS_TOKEN_SECRET} = process.env;
    message = constants.INVALID_USER_ACCESS;
    try {
        let access_token = req.headers['authorization'];
        if(_.isEmpty(access_token)){
            return res.status(403).send({message, code: 403})
        }
        access_token = req.headers['authorization'].split(" ")[1];
        req.user_id = await jwt.decode(access_token)["id"];
        await jwt.verify(access_token, ACCESS_TOKEN_SECRET);
    } catch(error) {
        if(error.name === "TokenExpiredError") {
            message = constants.TOKEN_EXPIRED
        } else if (error.name === "JsonWebTokenError") {
            message = constants.INVALID_TOKEN
        }
        return res.status(403).send({message, code: 403})
    }
    next();
}

const comparePassword = async (input_password, db_password) => {
    try {
        return await bcrypt.compare(input_password, db_password).then(result => result);
    } catch(error) {
        console.log(error)
    }
}

const validateObjectID = async (req, res, next) => {
    try {
        let requestMethod = _.upperCase(req.method);
        if(requestMethod === "GET" || requestMethod === "DELETE" || requestMethod === "PATCH") {
            let isValid = await Mongoose.Types.ObjectId.isValid(req.params.id);
            if(!isValid) {
                return res.status(406).send(constants.INVALID_PAYLOAD_PROVIDED);
            }
        }
    } catch(error) {
        console.log(error)
    }
    next();
}

module.exports = {
    accessToken,
    verifyToken,
    hashPassword,
    comparePassword,
    validateObjectID
}