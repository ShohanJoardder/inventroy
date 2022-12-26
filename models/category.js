const mongoose = require("mongoose")
const validator = require("validator")

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please provide a category name"],
        trim: true,
        lowercase: true,
        unique: true
    },
    description: String,

    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    }

},{
    timestamps: true,
    versionKey: false
})

const categoryModel = mongoose.model("category", categorySchema)
module.exports = categoryModel;