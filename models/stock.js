const mongoose = require("mongoose");
const validate = require("validator")
const {objectId} = mongoose.Schema.Types;

const stockSchema = mongoose.Schema({

    productId: {
        type: String,
        required: true,
        ref: "product"
    },
    
    name: {
        type: String,
        required: [true, "please provide a name for this product"],
        trim: true,
        lowercase: true,
        minLength: [3, "product name must be at least 3 character"],
        maxLength: [100, "name is too large"]
    },
    description: {
        type: String,
        required: true
    },

    unit: {
        type: String,
        required: true,
        enum: {
            value: ["kg", "letter", "pcs", "bag"],
            message: "unit value can't be {VALUE}, must be kg/letter/pcs/bag"
        }
    },

    imageURL: [{
        type: String,
        required: true,
        validate: [validator.isURL, "Please provide a valid url"]
    }],

    price: {
        type: Number,
        required: true,
        min: [0, "product price can't be negative"]
    },

    quantity: {
        type: Number,
        required: true,
        min: [0, "product quantity can't be negative"]
    },

    category: {
        type: String,
        required: true
    },

    brand: {
        name: {
            type: String,
            required: true
        },
        id: {
            type: objectId,
            ref: "brand",
            required: true,

        }
    },

    status: {
        type: String,
        required: true,
        enum:{
            value: ["in-stock", "out-of-stock", "discontinued"],
            message: "status can't be {VALUE}"
        }
    },

    store: {
        name: {
            type: String,
            required: [true, "please provide a store name"],
            trim: true,
            lowercase: true,
            enum:{
                value: ["Chuadanga", "Kushtia", "Jhenaidah", "Meherpur", "Jessore", "Khulna", "Dhaka"],
                message: "{VALUE} is not valid name"
            }
        },
        id: {
            type: objectId,
            required: true,
            ref: "store"
        }
    },


    supplierBy: {
        name: {
            type: String,
            trim: true,
            required: [true, "please provide a supplier name"]
        },
        id: {
            type: objectId,
            ref: "supplier"
        }
    },

    sellCount: {
        type: Number,
        default: 0,
        min: 0
    }


},{
    timestamps: true,
    versionKey: false
})


const stockModel = mongoose.model("stock", stockSchema)
module.exports = stockModel