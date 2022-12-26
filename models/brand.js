const mongoose = require("mongoose")
const validator = require("validator")
const {objectId} = mongoose.Schema.Types;


const brandSchema = mongoose.Schema({

    products: [{
        type: objectId,
        ref: "product"
    }],

    brand: {
        type: String,
        required: [true, "please provide a brand name"],
        trim: true,
        maxLength: 100,
        unique: true,
        lowercase: true
    },
    description: String,

    email: {
        type: String,
        required: [true, "please provide your email"],
        trim: true,
        lowercase: true,
        unique: true,
        validate: [validator.isEmail, "please provide a valid email"]
    },

    website: {
        type: String,
        validate: [validator.isURL, "please provide a valid URL"]
    },
    location: String,

    suppliers: [{
        type: String,
        contactNumber: String,
        id: {
            type: objectId,
            ref: "suppliers"
        }
    }],

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

},{
    timestamps: true,
    versionKye: false
})

const BrandModel = mongoose.model("Brand", brandSchema)
module.exports=BrandModel;