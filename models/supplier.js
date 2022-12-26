const mongoose = require("mongoose")
const validator = require("validator")
const {objectId} = mongoose.Schema.Types

const supplierSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "please provide a name"],
        trim: true,
        lowercase: true,
        minLength: [3, "name must be at least 3 character"],
        maxLength: [100, "name is too large"]
    },

    email: {
        type: String,
        required: [true, "email is required"],
        trim: true,
        validate: [validator.isEmail, "please provide a valid email"],
        lowercase: true
    },

    brand: {
        name: {
            type: String,
            required: true,
            trim: true
        },
        id: {
            type: objectId,
            ref: "brand",
            required: true
        }
    },

    contactNumber: [{
        type: String,
        required: [true, "please provide a contact number"],
        validate: {
            validator: (value)=>{
                return validator.isMobilePhone(value)
            },
            message: "please provide a valid phone number"
        }
    }],

    emergencyContactNumber: {
        type: String,
        required: [true, "please provide a emergency contact number"],
        validate: {
            validator: (value)=>{
                return validator.isMobilePhone(value)
            },
            message: "please provide a valid contact number"
        }
    },

    presentAddress: {
        type: String,
        required: [true, "please provide your present address"]
    },

    permanentAddress: {
        type: String,
        required: [true, "please provide your permanent address"]
    },

    location: {
        type: String,
        trim: true,
        required: true,
        enum: {
            value: ["Chuadanga", "Kushtia", "Jhenaidah", "Meherpur", "Jessore", "Khulna", "Dhaka"],
            message: "{VALUE} is not a correct location"
        }
    },

    imageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "please provide a valid url"]
    },

    nationalIdImageURL: {
        type: String,
        required: true,
        validate: [validator.isURL, "please provide a valid url"]
    },

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    }

},{
    timestamps: true,
    versionKey: false
})

const supplierModel = mongoose.model("supplier", supplierSchema)
module.exports = supplierModel;