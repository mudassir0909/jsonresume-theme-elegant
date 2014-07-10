//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `node serve`
//

var http = require("http");
var resume = require("resume-schema").resumeJson;
var theme = require("./index.js");

var port = 8888;
http.createServer(function(req, res) {
    res.writeHead(200, {
        "Content-Type": "text/html"
    });
    res.end(render());
}).listen(port);

console.log("Preview: http://localhost:8888/");
console.log("Serving..");

function render() {
    try {
        return theme.render(resume);
    } catch (e) {
        console.log(e.message);
        return "";
    }
}
