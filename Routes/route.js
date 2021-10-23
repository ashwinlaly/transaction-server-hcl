const express = require("express");
const router = express.Router();
const userRoutes = require("./user-routes")();

// // Routes
module.exports = (function() {
    router.use("/user", userRoutes);
    return router;
});