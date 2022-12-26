const mongoose = require("mongoose")
const {objectId} = mongoose.Schema.Types


const storeSchema = mongoose.Schema({

    name: {
        type: String,
        required: true,
        lowercase: true,
        enum: {
            values: [
                "Chuadanga",
                "Kushtia",
                "Jhenaidah",
                "Meherpur",
                "Jessore",
                "Khulna",
                "Dhaka"
            ],
            message: "{VALUE} is not correct store"
        }
    },
    description: String,

    status: {
        type: String,
        enum: ["active", "inactive"],
        default: "active"
    },

    manager: {
        name: String,
        contactNumber: String,
        id: {
            type: objectId,
            ref: "user"
        }
    }

},{
    timestamps: true,
    versionKey: false
})

const storeModel = mongoose.model("store", storeSchema)
module.exports = storeModel;