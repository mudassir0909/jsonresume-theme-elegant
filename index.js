var fs = require('fs');
var gravatar = require('gravatar');
var Mustache = require('mustache');
var _ = require('underscore');

function hasPersonalEmail(resumeObject) {
	return (resumeObject.bio && resumeObject.bio.email && resumeObject.bio.email.personal);
}

function render (resumeObject) {
	if (hasPersonalEmail(resumeObject)) {
		resumeObject.bio.gravatar = gravatar.url(resumeObject.bio.email.personal, {
			s: '100',
			r: 'pg',
			d: 'mm'
		});
	}

	var theme = fs.readFileSync(__dirname + '/resume.template', 'utf8');
	var resumeHTML = Mustache.render(theme, resumeObject);
	
	_.each(resumeObject.work, function (work_experience) {
		if (! work_experience.endDate) {
			work_experience.endDate = 'Present';
		}
	});
	
	return resumeHTML;
}

module.exports = { render: render };