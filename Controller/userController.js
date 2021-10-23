const _ = require("lodash");
const User = require("../Model/User");
const Transaction = require("../Model/Transaction");

const { 
    comparePassword, 
    accessToken, 
    hashPassword } = require('../Helpers/authHelper');

const signIn = async (req, res) => {
    const {customer_id, password} = req.body;
    userData = await User.findOne({customer_id}).exec();
    if(!_.isEmpty(userData)) {
        isValid = await comparePassword(password, userData.password);
        if (isValid) {
            data = await accessToken({id: userData._id, customer_id});
            return res.status(200).json({message : "Login sucess", code : 200, data});
        } else {
            return res.status(206).json({message : "Invalid credentials", code : 206});
        }
    } else {
        return res.status(206).json({message : "Invalid credentials", code : 206});
    }
}

const signUp = async (req, res) => {
    const user = new User;
    const {name, email, customer_id, password, banking} = req.body;
    user.password = await hashPassword(password);
    user.name = name;
    user.email = email;
    user.customer_id = customer_id;
    await user.save(err => {
        if(err){
            return res.status(206).json({message : "Invalid user credentials", code : 206, error : err.errors})
        } else {
            return res.status(200).json({message : "Account created sucessfully", code : 200})
        }
    });
}

const getOneTransaction = async (req, res) => {
    const {user_id} = req;
    const transaction_id = req.params.id;
    try {
        const TransactionData = await Transaction.find({
            _id: transaction_id,
            $or: [
                {from_id: user_id},
                {to_id: user_id}
            ]
        })
        .populate({path: 'from_id', select: '-_id name address banking'})
        .populate({path: 'to_id', select: '-_id name address banking'})
        .then(TransactionData => {
            if(TransactionData.length) {
                return res.status(200).json({
                    code : 200,
                    data: TransactionData,
                    count: TransactionData.length,
                    message : "Transaction data"
                });
            } else {
                return res.status(200).json({
                    code : 200, 
                    data: [],
                    message : "Invalid Transactions access."
                });
            }
        }).catch(error => {
            console.log(error);
            return res.status(406).json({message : "Please try after sometime!", code : 406});
        })
    } catch(error) {
        console.log(error);
        return res.status(406).json({message : "Please try after sometime!", code : 406});
    }
}

const getAllTransactions = async (req, res) => {
    let skip = 0;
    let limit = 10;
    if(req.query.skip) {
        skip = req.query.skip;
    }
    if(req.query.limit) {
        limit = req.query.limit;
    }
    const {user_id} = req;
    try {
        const TransactionData = await Transaction.find({
            $or: [
                {from_id: user_id},
                {to_id: user_id}
            ]
        })
        .populate({path: 'from_id', select: '-_id name'})
        .populate({path: 'to_id', select: '-_id name'})
        .sort({created_at: 1})
        .limit(limit)
        .skip(skip)
        .then(TransactionData => {
            if(TransactionData.length) {
                return res.status(200).json({
                    code : 200, 
                    data: TransactionData,
                    count: TransactionData.length,
                    message : "Listing Transaction data"
                });
            } else {
                return res.status(200).json({
                    code : 200, 
                    data: [],
                    message : "No Transactions yet."
                });
            }
        }).catch(error => {
            console.log(error);
            return res.status(406).json({message : "Please try after sometime!", code : 406});
        })
    } catch(error) {
        console.log(error);
        return res.status(406).json({message : "Please try after sometime!", code : 406});
    }
}

module.exports = {
    signIn,
    signUp,
    getOneTransaction,
    getAllTransactions,
};