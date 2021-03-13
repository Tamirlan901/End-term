var http = require("http")
var fs = require("fs");
var nodeHtmlToImage = require('node-html-to-image');

function serveStaticFile(messageType, path, contentType, responseCode) {
    if (!responseCode) responseCode = 200;
    fs.readFile(__dirname + path, function(err, data) {
        if(err) {
            messageType.writeHead(500, {"Content-Type":"text/plain"})
            messageType.end("500 - Internal error")
        }
        else{
            messageType.writeHead(responseCode, {"Content-Type":contentType});
            messageType.end(data)
        }

    })
}  



http.createServer(function(reg, res) {

    var path = reg.url.replace(/\/?(?:\?.*)?$/, "").toLowerCase();
    switch(path){
        case"":
        serveStaticFile(res, "/index.html", "text/html")
        break;
        case"/img/index":
        serveStaticFile(res, "/img/welcome.jpg", "image/jpeg")
        break;
        case"/about":
        serveStaticFile(res, "/about.html", "text/html")
        break;
        case "/img/about":
        serveStaticFile(res, "/img/about.jpg", "image/jpeg")
        break;
        case"/img/gallery/study":
        serveStaticFile(res, "/img/gallery/study.jpg", "image/jpeg")
        break;
        case"/img/gallery/graduation":
        serveStaticFile(res, "/img/gallery/graduation.jpg", "image/jpeg")
        break;
        case "/video/memes":
        serveStaticFile(res, "/video/students/memes.mp4", "video/mp4")
        break;    
        case"":
        serveStaticFile(res, "/style.css", "text/css")
        break;
        default:
        serveStaticFile(res, "/error.html", "text/html", 404)
        break;
    
    }
}).listen(3000)
    
    console.log("The server is running on localhost:3000. Press CTRL+C to terminate...")


