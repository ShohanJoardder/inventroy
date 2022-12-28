const { expressjwt } = require("express-jwt");
const User = require("../models/user")

exports.requireSignIn = expressjwt({
    secret: process.env.JWT_SECRETE,
    algorithms: ["HS256"]
})

exports.isAdmin = async (req, res, next)=>{
    console.log("auth test", req.auth)
    try{
        const user = await User.findById(req.auth._id);
        if(user.role !== "admin"){
            return res.status(403).json({
                status: "fail",
                message: "unauthorized admin resource"
            });
        }else{
            next()
        }
    }catch(err){
        console.log(err)
    }
};

exports.isManager = async (req, res, next)=>{
    console.log("Auth Test", req.auth);

    try{
        const user = await User.findById(req.auth._id)
        if(user.role !=="store-manager"){
        return res.status(404).json({
            status: "Fail",
            message: "Unauthorized store manager resource"
        });
    }else{
        next()
    }
    }catch(err){
        console.log(err)
    }
};