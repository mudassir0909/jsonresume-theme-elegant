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

function getUrlFromUsername( site, username ) {
    var url_map = {
        github: 'github.com',
        twitter: 'twitter.com',
        soundcloud: 'soundcloud.com',
        pinterest: 'pinterest.com',
        vimeo: 'vimeo.com',
        behance: 'behance.net',
        codepen: 'codepen.io',
        foursquare: 'foursquare.com',
        reddit: 'reddit.com',
        spotify: 'spotify.com',
        dribble: 'dribbble.com',
        dribbble: 'dribbble.com',
        facebook: 'facebook.com',
        angellist: 'angel.co',
        bitbucket: 'bitbucket.org',
        googleplus: 'plus.google.com',
        skype: 'skype',
        tumblr: 'tumblr.com',
        youtube: 'www.youtube.com',
        gratipay: 'gratipay.com'
    };

    site = site.toLowerCase();

    if ( !username || !url_map[ site ] ) {
        return;
    }

    switch( site ) {
        case 'skype':
            return url_map[ site ] + ':' + username + '?call';
        case 'reddit':
        case 'spotify':
            return '//' + 'open.' + url_map[ site ] + '/user/' + username;
        case 'googleplus':
            return '//' + url_map[ site ] + '/u/0/+' + username;
        case 'tumblr':
            return '//' + username + '.' + url_map[ site ];
        case 'youtube':
            return '//' + url_map[ site ] + '/user/' + username;
        default:
            return '//' + url_map[ site ] + '/' + username;
    }
 }

function render(resume) {
    var css = fs.readFileSync(__dirname + '/assets/css/theme.css', 'utf-8'),
        template = fs.readFileSync(__dirname + '/resume.template', 'utf-8'),
        profiles = resume.basics.profiles,
        social_sites = ["github", "linkedin", "stackoverflow", "twitter",
                        "soundcloud", "pinterest", "vimeo", "behance",
                        "codepen", "foursquare", "reddit", "spotify",
                        "dribble", "dribbble", "facebook", "angellist",
                        "bitbucket", "skype", "youtube", "tumblr", 
                        "gratipay", "googleplus"],
        date_format = 'MMM, YYYY';

    if (!resume.basics.picture && hasEmail(resume)) {
        resume.basics.picture = gravatar.url(resume.basics.email.replace('(at)', '@'), {
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

        if ( start_date ) {
            end_date = end_date || new Date();
            work_info.duration = humanizeDuration(
                moment.duration( end_date.getTime() - start_date.getTime() ),
                did_leave_company )
        }
    });

    _.each( resume.skills, function( skill_info ) {
        var levels = [ 'Beginner', 'Intermediate', 'Advanced', 'Master' ];

        if ( skill_info.level ) {
            skill_info.skill_class = skill_info.level.toLowerCase();
            skill_info.level = _s.capitalize( skill_info.level.trim() );
            skill_info.display_progress_bar = _.contains( levels,
                                                          skill_info.level );
        }
    });

    resume.skills = _.sortBy( resume.skills, function( skill ) {
        var level = skill.level && skill.level.toLowerCase(),
            sort_map = {
                master: 1,
                advanced: 2,
                intermediate: 3,
                beginner: 4
            };

        return sort_map[ level ];
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

    _.each( social_sites, function( site ) {
        var username,
            social_account = getNetwork( profiles, site );

        if ( social_account ) {
            username = social_account.username;
            resume.basics[ site + '_url' ] =
                getUrlFromUsername( site, username ) || social_account.url;
        }
    });

    return Handlebars.compile(template)({
        css: css,
        resume: resume
    });
}

module.exports = {
    render: render
};
