var fs = require('fs');
var Handlebars = require('handlebars');
var gravatar = require('gravatar');
var _ = require('underscore');
var _s = require('underscore.string');
var moment = require('moment');

// Utity Methods ( need be moved to a separate file)

function hasEmail(resume) {
    return !!resume.basics && !! resume.basics.email;
}

function getNetwork(profiles, network_name) {
    return _.find(profiles, function(profile) {
        return profile.network.toLowerCase() === network_name;
    });
}

function humanizeDuration ( moment_obj, did_leave_company ) {
    var days,
        months = moment_obj.months(),
        years = moment_obj.years(),
        month_str = months > 1 ? 'months' : 'month',
        year_str = years > 1 ? 'years' : 'year';

    if ( months && years ) {
        return years + ' ' + year_str + ' ' + months + ' ' + month_str;
    }

    if ( months ) {
        return months + ' ' + month_str;
    }

    if ( years ) {
        return years + ' ' + year_str;
    }

    if ( did_leave_company ) {
        days = moment_obj.days();

        return ( days > 1 ? days + ' days' : days + ' day' );
    } else {
        return 'Recently joined';
    }
}

function render(resume) {
    var css = fs.readFileSync(__dirname + '/assets/css/theme.css', 'utf-8'),
        template = fs.readFileSync(__dirname + '/resume.template', 'utf-8'),
        profiles = resume.basics.profiles,
        twitter_account = getNetwork(profiles, 'twitter'),
        github_account = getNetwork(profiles, 'github'),
        linkedin_account = getNetwork(profiles, 'linkedin'),
        skype_account = getNetwork(profiles, 'skype'),
        date_format = 'MMM, YYYY';


    if (hasEmail(resume)) {
        resume.basics.gravatar = gravatar.url(resume.basics.email.replace('(at)', '@'), {
            s: '100',
            r: 'pg',
            d: 'mm'
        });
    }

    if ( resume.languages ) {
        resume.basics.languages = _.pluck( resume.languages, 'language' ).join( ', ' );
    }
    _.each( resume.work, function( work_info ) {
        var did_leave_company,
            start_date = work_info.startDate && new Date( work_info.startDate ),
            end_date = work_info.endDate && new Date( work_info.endDate );

        if ( start_date ) {
            work_info.startDate = moment( start_date ).format( date_format );
        }

        if ( end_date ) {
            work_info.endDate = moment( end_date ).format( date_format );
        }

        did_leave_company = !! end_date;
        end_date = end_date || new Date();
        work_info.duration = humanizeDuration(
            moment.duration( end_date.getTime() - start_date.getTime() ),
            did_leave_company )
    });

    _.each( resume.skills, function( skill_info ) {
        var levels = [ 'Beginner', 'Intermediate', 'Advanced', 'Master' ];

        if ( skill_info.level ) {
            skill_info.skill_class = skill_info.level.toLowerCase();
            skill_info.level = _s.capitalize( skill_info.level.trim() );
            skill_info.display_progress_bar = _.contains( levels, skill_info.level );
        }
    });

    _.each( resume.education, function( education_info ) {
        _.each( [ 'startDate', 'endDate' ], function ( date ) {
            var date_obj = new Date( education_info[ date ] );

            if ( education_info[ date ] ) {
                education_info[ date ] = moment( date_obj ).format( date_format );
            }
        });
    });

    _.each( resume.awards, function( award_info ) {
        if ( award_info.date ) {
            award_info.date = moment( new Date( award_info.date ) ).format( 'MMM DD, YYYY' )
        }
    });

    _.each( resume.publications, function( publication_info ) {
        if ( publication_info.releaseDate ) {
            publication_info.releaseDate = moment( new Date( publication_info.releaseDate ) ).format( 'MMM DD, YYYY' )
        }
    });

    _.each( resume.volunteer, function( volunteer_info ) {
        _.each( [ 'startDate', 'endDate' ], function ( date ) {
            var date_obj = new Date( volunteer_info[ date ] );

            if ( volunteer_info[ date ] ) {
                volunteer_info[ date ] = moment( date_obj ).format( date_format );
            }
        });
    });

    twitter_account && _.extend(resume.basics, {
        twitterHandle: twitter_account.username
    });
    github_account && _.extend(resume.basics, {
        githubUsername: github_account.username
    });
    linkedin_account && linkedin_account.url && _.extend(resume.basics, {
        linkedinUrl: linkedin_account.url
    });
    skype_account && _.extend(resume.basics, {
        skypeHandle: skype_account.username
    });

    return Handlebars.compile(template)({
        css: css,
        resume: resume
    });
}

module.exports = {
    render: render
};
