const express = require("express")

const dotenv = require("dotenv")
dotenv.config({path: "./.env"});

const request = require("request")

const app = express();

//app.set("trust proxy", true)

// port
PORT = 4000

//route
//const api_key = 323f0f1211f0b115ea4e02a1b14e12ca


app.get("/", (req, res)=>{
    res.status(200).json({message: "ggggg"})
})

app.get("/api/hello", (req, res)=>{
    const visitor = req.query.visitors_name 

    const city = "abuja"

    const ipAddress = 
    req.ip ||
    req.headers['cf-connection-ip'] ||
    req.headers['x-real-ip'] ||
    req.headers['x-forwarded-for'] 


    const request = require("request");
    request(`https://api.openweathermap.org/data/2.5/weather?q=abuja&appid=${ process.env.API_KEY }`,
        function(error, response, body) {
            if (response.statusCode = 200){
                let data = JSON.parse(body)
                console.log(data.weather[0].main)
                res.send(`ip: ${ipAddress} The weather in ${city} is ${data.weather[0].main}`)
            }
        }
    )
})

app.listen(5000, ()=>{
    console.log(`App is runing on ${PORT}`)
})
