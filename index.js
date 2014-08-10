var fs = require('fs');
var Handlebars = require('handlebars');
var gravatar = require('gravatar');
var _ = require('underscore');

// Utity Methods ( need be moved to a separate file)
function hasEmail( resume ) {
	return !!resume.basics && !!resume.basics.email;
}

function getNetwork( profiles, network_name ) {
	return _.find( profiles, function ( profile ) {
		return profile.network.toLowerCase() === network_name;
	});	
}

function render ( resume ) {
	var css = fs.readFileSync(__dirname + '/style.css', 'utf-8'),
		template = fs.readFileSync(__dirname + '/resume.template', 'utf-8'),
		profiles = resume.basics.profiles,
		twitter_account = getNetwork( profiles, 'twitter' ),
		github_account = getNetwork( profiles, 'github' );
	
	if( hasEmail( resume ) ) {
		resume.basics.gravatar = gravatar.url( resume.basics.email, {
	    	s: '100',
	        r: 'pg',
	        d: 'mm'
	    });
	}
	
	_.each(resume.work, function ( work_experience ) {
		work_experience.endDate = work_experience.endDate || "Present";
	});
	
	twitter_account && _.extend( resume.basics, {
		twitterHandle: twitter_account.username
	});	
	github_account && _.extend( resume.basics, {
		githubUsername: github_account.username
	});
	
	return Handlebars.compile( template )({
		css: css,
		resume: resume
	});
}

module.exports = {
	render: render
};