const express = require('express')
const http = require('http')
const Stream = require('stream').Transform
const app = express()
const port = 8080;

const cameraHost = "http://192.168.1.222/";
const cameraUser = "admin";
const cameraPass = "";

app.use(express.static('view'))

app.get('/', (req, res) => {
    res.send("./view/index.html")
})

app.get('/api/camera/:id', (req, res) => {
    //console.log("request ", req.params.id);
    const url =`${cameraHost}cgi-bin/snapshot.cgi?chn=${req.params.id}&u=${cameraUser}&p=${cameraPass}&q=100&d=1&`;
    http.request(url, function(response) {
        const data = new Stream();

        response.on('data', function(chunk) {
            data.push(chunk);
        });

        response.on('end', function() {
            res.writeHead(200, {'Content-Type': 'image/png'});
            res.end(data.read()); // Send the file data to the browser.
        });
    }).end();
});

console.log("App listen on " + port);
app.listen(port)