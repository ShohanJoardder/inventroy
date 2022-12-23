const express = require("express")
const app = express()
const helmet = require("helmet")
const mongoose = require("mongoose")
require("dotenv").config()
const morgan = require("morgan")
const cors = require("cors")
const {readdirSync} = require("fs")


// Middleware
app.use(helmet())
app.use(express.static("public"))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan("dev"))
app.use(cors())


// DataBase Connection
mongoose
        .connect(process.env.DATABASE)
        .then(()=> console.log("DB Connected"))
        .catch((err)=> console.log("DB error =>", err))



// Route Middleware
readdirSync("./routes").map(r => app.use("/api/v1", require(`./routes/${r}`)));


// Server
const port = process.env.PORT || 8000

app.listen(port, ()=>{
  console.log(`App is running on port ${port}`)
});