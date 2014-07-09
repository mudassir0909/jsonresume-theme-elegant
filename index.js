var fs = require('fs');
var gravatar = require('gravatar');
var schema = require('resume-schema');
var resume = schema.resumeJson;
var Mustache = require('mustache');

function render () {
	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resume);
	return resumeHTML;
}

module.exports = { render: render };