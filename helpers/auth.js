const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs")

exports.generateToken = (userInfo)=>{

    const payload = {
        email: userInfo.email,
        _id: userInfo._id,
        role: userInfo.role
    }

    const token = jwt.sign(payload, process.env.JWT_SECRETE, {expiresIn: '7days'})

    return token
}