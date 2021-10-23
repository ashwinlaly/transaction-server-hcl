const express = require("express");
const router = express.Router();

// // HELPER
const { verifyToken, 
        validateObjectID } = require("../Helpers/authHelper");

// // CONTROLLER
const userController = require("../Controller/userController");

// // Routes
module.exports = (function() {
    router.post("/signin", userController.signIn);
    router.post("/signup", userController.signUp);

    router.use("*", [verifyToken]);
    router.get("/transactions", userController.getAllTransactions);
    router.get("/transaction/:id", [validateObjectID], userController.getOneTransaction);
    return router;
});