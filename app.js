const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
res.sendFile(__dirname+"/index.html");
})

app.post("/",function(req,res){
  var city = req.body.cityName;
  var query = req.body.cityName;
  const unit = "metric";
  const appKey = "e3931e70d7ce0b0cf2d28fef4fc32464";
  const url ="https://api.openweathermap.org/data/2.5/find?appid="+appKey+"&q="+query+"&units="+unit+" ";
  https.get(url,function(response){
    //console.log(response.statusCode);

    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.list[0].main.temp;
      const humid = weatherData.list[0].main.humidity;
      var speed = weatherData.list[0].wind.speed *3.6;
      const details=weatherData.list[0].name;
      const des=weatherData.list[0].weather[0].description;
      speed = speed.toFixed(2);

      const icon = weatherData.list[0].weather[0].icon;
      const imageURL = "http://openweathermap.org/img/wn/" + icon + "@4x.png";

      res.write("<h1> Weather in "+query+" is currently <mark>"+des+"</mark> </h1>");
      res.write("<img src="+imageURL+">");
      res.write("<br>");
      res.write("<h1> Temperature <mark>"+temp+" degree celcius </mark> </h1>");
      res.write("<h1> Humidity <mark>"+humid+"%</mark> </h1>");
      res.write("<h1> Wind Speed <mark>"+speed+" Kilometer per hour </mark> </h1>");

      res.send();
   })
 })
})

app.listen(process.env.PORT||3000,function(){
  console.log("Server is running on port 3000");
})
