const {signUpService} = require("../services/user")
exports.signUp = async (req, res)=>{
    try{
        const user = await signUpService(req.body)
 
        await user.save({validateBeforeSave: false})

        res.status(200).json({
            status: "success",
            message: "Successfully signed up"
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            status: "Fail",
            message: err.message
        })
    }
}
