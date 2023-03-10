const mongoose = require("mongoose")
const validator = require("validator")
const crypto = require("crypto")
const bcrypt = require("bcryptjs")


const userSchema = mongoose.Schema({

    email: {
        type: String,
        validate: [validator.isEmail, "Provide a valid email"],
        trim: true,
        lowercase: true,
        unique: true,
        required: [true, "Email address is required"]
    },

    password: {
        type: String,
        required: [true, "password is required"],
        validate: {
            validator: (value)=>
                validator.isStrongPassword(value, {
                    minLength: 6,
                    minLowercase: 3,
                    minNumbers:1,
                    minUppercase: 1,
                    minSymbol: 1
                }),
                message: "password {VALUE} is not strong enough"
        }
    },

    confirmPassword: {
        type: String,
        required: [true, "Please confirm your password"],
        validate: {
            validator: function (value){
                return value === this.password
            },
            message: "password don't match!"
        }
    },

    role: {
        type: String,
        enum: ["buyer", "store-manager", "admin", "author"],
        default: "buyer"
    },

    firstName: {
        type: String,
        required: [true, "please provide your first name"],
        trim: true,
        minLength: [3, "name must be at least 3 characters"],
        maxLength: [100, "name is too large"]
    },

    lastName: {
        type: String,
        required: [true, "please provide your last name"],
        trim: true,
        minLength: [3, "name must be at least 3 characters"],
        maxLength: [100, "name is too large"]
    },

    contactNumber: {
        type: String,
        validate: [validator.isMobilePhone, "please provide a valid contact number"]
    },

    shippingAddress: String,

    imageURL: {
        type: String,
        validate: [validator.isURL, "please provide a valid url"]
    },

    status: {
        type: String,
        enum: ["active", "inactive", "blocked"],
        default: "inactive"
    },


    conformationToken: String,
    conformationTokenExpires: Date,

    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,


},{
    timestamps: true,
    versionKey: false
});

userSchema.pre("save", function(next){
    if(!this.isModified("password")){
        return next()
    }

    const password = this.password;
    const hashPassword = bcrypt.hashSync(password)

    this.password = hashPassword
    this.confirmPassword = undefined;

    next()
});


userSchema.methods.comparePassword = function(password, hashPassword){
    const isPasswordValid = bcrypt.compareSync(password, hashPassword)
    return isPasswordValid;
};


userSchema.methods.generateConformationToken = function (){
    const token = crypto.randomBytes(32).toString("hex")

    this.conformationToken = token;

    const date = new Date();

    date.setDate(date.getDate() +1)
    this.conformationTokenExpires = date;

    return token;
}



const userModel = mongoose.model("user", userSchema)
module.exports=userModel;