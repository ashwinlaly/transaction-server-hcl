const Mongoose = require("mongoose");

const transactionSchema = new Mongoose.Schema({
    from_id : {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    to_id : {
        type: Mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "users"
    },
    amount: {
        type: Number,
        required: true,
    },
    comments: {
        type: String,
        trim: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Transaction = Mongoose.model("transaction", transactionSchema);
module.exports = Transaction;