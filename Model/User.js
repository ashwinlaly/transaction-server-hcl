const Mongoose = require("mongoose");

const userSchema = new Mongoose.Schema({
    name : {
        type: String,
        trim: true,
        min: 4,
        max: 30,
        required: true
    },
    customer_id: {
        type: String,
        trim: true,
        min: 10,
        max: 30,
        unique: true,
        required: true
    },
    email : {
        type: String,
        trim: true,
        min: 6,
        max: 50,
        required: true
    },
    password: {
        type: String,
        trim: true,
        min: 6,
        max: 50,
        required: true
    },
    phone: {
        type: String,
        trim: true,
        min: 10,
        max: 15
    },
    address: {
        door_no: {
            type: String,
            trim: true,
            default: ""
        },
        street: {
            type: String,
            trim: true,
            default: ""
        },
        district: {
            type: String,
            trim: true,
            default: ""
        },
        state: {
            type: String,
            trim: true,
            default: ""
        },
        country: {
            type: String,
            trim: true,
            default: "India"
        }
    },
    banking: {
        account_number: {
            type: String,
            trim: true
        },
        ifsc_code: {
            type: String,
            trim: true
        },
        amount: {
            type: Number,
            trim: true
        },
        branch_code: {
            type: String,
            trim: true
        }
    },
    is_active: {
        type: Boolean,
        default: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
});

const User = Mongoose.model("users", userSchema);
module.exports = User;