//API LINK: api.openweathermap.org/data/2.5/weather?q={city name}&appid=bdfe656f365587154bc1c989cbde73fd

const fs = require('fs');
const http = require('http');
const requests = require('requests');

const htmlFile = fs.readFileSync("Frontend/weatherf.html", "utf-8");
var data;

const changeVal = (file,data)=>{
    let newFile = file.replace("{%tempVal%}",data.main.temp);
    newFile = newFile.replace("{%weather%}",data.weather[0].main);
    newFile = newFile.replace("{%location%},{%country%}","Pune, India");
    newFile = newFile.replace("{%nTemp%}",data.main.temp_min);
    newFile = newFile.replace("{%xTemp%}",data.main.temp_max);
    return newFile;
}

const server = http.createServer((req, res) => {
    if (req.url == "/") {
        requests("http://api.openweathermap.org/data/2.5/weather?q=pune&appid=bdfe656f365587154bc1c989cbde73fd").on("data", (chunk)=>{
                data=JSON.parse(chunk);
                const listData=[data];
                var newFile;
                listData.map((val)=> newFile=changeVal(htmlFile,val));
                res.write(newFile);
            }).on("end",(err)=>{
                if (err) return console.log('connection closed due to errors', err);

                console.log('end');
            });
    }
})

server.listen(8000,"127.0.0.1",()=>{
    console.log("Server is running at http://localhost:8000");
})