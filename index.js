const express = require("express")

const dotenv = require("dotenv")
dotenv.config({path: "./.env"});

const request = require("request");
const axios = require("axios");
const cors = require("cors")

const app = express();

app.use(cors());

// Function connecting to ipapi
const ipapiConnection = async (visitorIP)=>{
    try {
        //Consuming the ipapi to get visitors location
        const response = await axios.get(`https://ipapi.co/${visitorIP}/json/`)

        //Retrive the city
        const {city} = response.data

        return { status: "success", data: city}
        
    } catch (error) {
        return { status: "failed"}
    }
}

app.get("/api/hello", async (req, res)=>{
    
    //Visitors name
    const visitor = req.query.visitors_name || "Annonimous"

    //stores visitors IP addresss
    let visitorIP = req.ip || req.headers['x-forwarded-for'] || req.connection.remoteAddress

    if (visitorIP === '::ffff:127.0.0.1' || visitorIP === '::1' || visitorIP === '127.0.0.1'){
        visitorIP = "8.8.8.8"
    }


    try {

        // calling the ipapi connection function above
        const getCity = await ipapiConnection(visitorIP);

        //Handles ipapi connection failure
        if (getCity.status === "failed"){
            res.status(500).json({ message: "Failed to connect to ipapi"})
        }

        // Handles the ipapi connection success
        if (getCity.status === "success"){

            // Stores city from the ipapi connection function
            let city = getCity.data

            //Consuming the Open weather api
            const request = require("request");
            request(`https://api.openweathermap.org/data/2.5/weather?q=${ city }&appid=${ process.env.API_KEY }`,
                function(error, response, body) {
                    if (response.statusCode = 200){

                        let data = JSON.parse(body)
                        console.log(data)
                        
                        res.send({
                            client_ip: visitorIP,
                            location: city,
                            greeting:`Hello, ${visitor}!, the temerature is ${data.main.temp} degrees celcius in ${city}`})
                    }
            }
        )
        }
        
    } catch (error) {
        res.status(500).json({ message: error.message})
    }   
})

app.listen(process.env.PORT, ()=>{
    console.log(`App is runing on ${process.env.PORT}`) 
})
