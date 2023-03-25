const express  =  require("express");


const https = require("https");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.get("/" , function(req , res){
    res.sendFile(__dirname+"/index.html")
    
})
app.post("/" , function(req , res){
   
    
    const query = req.body.cityName;
    const apikey = "a5718e5847b26ebbad7dd154e3f9010f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" +query+ "&appid=" + apikey +"&units ="+unit;
    https.get(url , function(response){
        console.log(response.statusCode);
        response.on("data",(data)=>{
            
           const weatherData =  JSON.parse(data);
           console.log(weatherData);
           const temp = weatherData.main.temp
           
           console.log(temp);
           const pressure = weatherData.main.pressure
           console.log(pressure)
           const des = weatherData.weather[0].main;
           const icon = weatherData.weather[0].icon;
           const imagUrl = "http://openweathermap.org/img/wn/"+icon+"@2x.png";
           console.log(des)
           res.write("<h1>The Current temperature in "+query+" is "+temp+"  degree Celcius");
           res.write("<p>The weather description in "+query+"  is  "  + des + " </p>")
           res.write("<p>The pressure in "+query+" is "+pressure+" </p>");
           res.write("<img src = "+imagUrl+">")
           res.send();
        });
        
    });
})

//     // res.send("<h1>Server is running</h1>");








app.listen(3000,function(){
    console.log("Server is running on Port 3000");
})