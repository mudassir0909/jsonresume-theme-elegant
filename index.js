var fs = require('fs');
var gravatar = require('gravatar');
var schema = require('resume-schema');
var resumeObject = schema.resumeJson;
var Mustache = require('mustache');

function hasPersonalEmail(resumeObject) {
	return (resumeObject.bio && resumeObject.bio.email && resumeObject.bio.email.personal);
}

function render () {
	if (hasPersonalEmail(resumeObject)) {
		resumeObject.bio.gravatar = gravatar.url(resumeObject.bio.email.personal, {
			s: '100',
			r: 'pg',
			d: 'mm'
		});
	}

	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	
	return resumeHTML;
}

module.exports = { render: render };