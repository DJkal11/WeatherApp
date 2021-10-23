
const express = require("express");
const https = require("https");
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const path = require('path');
const ejs = require("ejs");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/", function(req, res){

    res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
    
    const query = req.body.cityName;
    const apiKey = `${process.env.apiKey}`;
    const units = "metric"

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+apiKey+"&units="+units+"";

    https.get(url, function(response){
        
         
        response.on("data", function(data){
          const weatherData = JSON.parse(data); 
          const city = weatherData.name;
          const temp = weatherData.main.temp; 
          const description = weatherData.weather[0].description;
          const weatherIcon = weatherData.weather[0].icon;
          const iconUrl = "http://openweathermap.org/img/wn/"+weatherIcon+"@2x.png";
          res.render("response", {description: description, city: city, temp: temp, iconUrl: iconUrl});
           
        })
    });
})





app.listen(3000, function(){
    console.log("Server is running!!!");
})