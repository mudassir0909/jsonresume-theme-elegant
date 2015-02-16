//
// This script will render the response and write it to the index.html file.
//
// Usage:
// `node render`
//

var fs = require('fs');
var resume = require("resume-schema").resumeJson;
var theme = require("./index.js");

fs.writeFile("./build/index.html", render(), function(err) {
    if(err) {
        console.log(err);
    } else {
        console.log("index.html written to build folder.");
    }
}); 

function render() {
    try {
        return theme.render(resume);
    } catch (e) {
        console.log(e.message);
        return "";
    }
}
