const express = require("express");
const https = require("https");
const bodyParser = require("body-parser")
const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));

var port = 9000;

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
})
app.post("/",(req,res)=>{
    console.log(req.body.city);
    var city =req.body.city;
    const apiKey = "7cdb55f6eb1689e80726b8a97808cec5";
    var unit = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;
    https.get(url,(response)=>{
        response.on("data",(data)=>{
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const des = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const src = `https://openweathermap.org/img/wn/${icon}@2x.png`
            console.log()
            res.write(`<h1>The weather in ${city} is ${temp} degree celcius</h1>`)
            res.write(`<h3>${des}</h3>`)
            res.write(`<img src=${src}>`)
            res.send();
        })
    })
})




app.listen(port,()=>{
console.log("listening at port : "+port)
})