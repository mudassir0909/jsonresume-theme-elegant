//
// This script will run a local development server. This is useful when
// developing the theme.
//
// Usage:
// `node serve`
//

var path = require('path');
var connect = require('connect');
var serveStatic = require('serve-static');

var port = 8888;
connect().use(serveStatic(path.join(__dirname,'build'))).listen(port, function() {
	console.log("Preview: http://localhost:"+port);
	console.log("Serving..");
});

function render() {
    try {
    	return fs.readFileSync(path.join(__dirname, 'build/index.html'), {encoding: 'utf-8'}, function (err, data) {
		if(!err) {
			console.log(data);
		}
    	});
    } catch (e) {
        console.log(e.message);
        return "";
    }
}
