const mongoose = require("mongoose")


const brandSchema = mongoose.Schema({

},{
    timestamps: true,
    versionKye: false
})

const BrandModel = mongoose.model("Brand", brandSchema)
module.exports=BrandModel;