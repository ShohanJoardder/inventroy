const mongoose = require("mongoose")
const validator = require("validator")
const {objectId} = mongoose.Schema.Types;

const productSchema = mongoose.Schema({

    name: {
        type: String,
        required: [true, "please provide a product name"],
        trim: true,
        unique: [true, "name must be unique"],
        lowercase: true,
        minLength: [3, "name must be at least 3 character"],
        maxLength: [100, "name is too large"]
    },
    description: {
        type: String,
        required: true
    },

    unit: {
        type: String,
        required: true,
        enum:{
            value: ["kg", "letter", "pcs", "bag"],
            message: "unit value cat't be {VALUE}, must be kg/letter/pcs/bag"
        }
    },

    imageURL: [{
        type: String,
        required: true,
        validate: [validator.isURL, "wrong URL"]
    }],

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
            required: true
        }

    }

},{
    timestamps: true,
    versionKye: false
})


productSchema.pre("save", function(next){
    if(this.quantity == 0){
        this.status = "out-of-stock"
    }

    next()
})

const productModel = mongoose.model("product", productSchema)
module.exports = productModel;