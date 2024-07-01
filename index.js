const express = require("express")

const app = express();

//app.set("trust proxy", true)

// port
PORT = 3000

//route
app.get("/api/hello", (req, res)=>{
    const visitor = req.query.visitors_name 

    const ipAddress = 
    req.ip ||
    req.headers['cf-connection-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] 
    res.status(200).json({
        ip: `${ipAddress}`,
        message: `${visitor}`,

    })
})

app.listen(PORT, ()=>{
    console.log(`App is runing on ${PORT}`)
})
