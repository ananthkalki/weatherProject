const express= require("express");
const https= require("https");
const bodyParser= require("body-parser");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/",(req,res)=>{
    res.sendFile(__dirname+"/index.html")
});

app.post("/",(req,res)=>{
    const city=req.body.city
    const api_key="626bf612849a6563a6a206745013b386"
    const url="https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+api_key+"&units=metric";
    https.get(url,(api_res)=>{
        

        api_res.on('data',(data)=>{
            const weather_data = JSON.parse(data);
            const temp = weather_data.main.temp;
            const desc = weather_data.weather[0].description;
            const icon = weather_data.weather[0].icon;
            const iconUrl="http://openweathermap.org/img/wn/"+icon+"@2x.png";
            console.log(iconUrl);
            res.write("<h1>"+temp+"deg</h1>");
            res.write("<h1>"+desc+"</h1>");
            res.write("<img src="+iconUrl+">");
            res.send()
        });
    })

})






app.listen(3000,()=>{console.log("server started at 3000")});