var fs = require('fs');
var jade = require('jade');
var _ = require('underscore');
var utils = require('jsonresume-themeutils');

utils.setConfig({
    date_format: 'MMM, YYYY'
});

function interpolate(object, keyPath) {
    var keys = keyPath.split('.');

    return !_.isEmpty(
      _(keys).reduce(function(res, key) {
        return (res || {})[key];
    }, object));
}

function getFloatingNavItems(resume) {
    var floating_nav_items = [
        {label: 'About', target: 'about', icon: 'board', requires: 'basics.summary'},
        {label: 'Work Experience', target: 'work-experience', icon: 'office', requires: 'work'},
        {label: 'Skills', target: 'skills', icon: 'tools', requires: 'skills'},
        {label: 'Education', target: 'education', icon: 'graduation-cap', requires: 'education'},
        {label: 'Awards', target: 'awards', icon: 'trophy', requires: 'awards'},
        {label: 'Volunteer Work', target: 'volunteer-work', icon: 'child', requires: 'volunteer'},
        {label: 'Publications', target: 'publications', icon: 'newspaper', requires: 'publications'},
        {label: 'Interests', target: 'interests', icon: 'heart', requires: 'interests'},
        {label: 'References', target: 'references', icon: 'thumbs-up', requires: 'references'}
    ];

    return _(floating_nav_items).filter(function(item) {
        return interpolate(resume, item.requires);
    });
}

function render(resume) {
    var addressValues;
    var addressAttrs = ['address', 'city', 'region', 'countryCode', 'postalCode'];
    var css = fs.readFileSync(__dirname + '/assets/css/theme.css', 'utf-8');

    resume.basics.picture = utils.getUrlForPicture(resume);

    addressValues = _(addressAttrs).map(function(key) {
        return resume.basics.location[key];
    });

    resume.basics.computed_location = _.compact(addressValues).join(', ');

    if (resume.languages) {
        resume.basics.languages = _.pluck(resume.languages, 'language').join(', ');
    }

    _(resume.basics.profiles).each(function(profile) {
        var label = profile.network.toLowerCase();

        profile.url = utils.getUrlForProfile(resume, label);
        profile.label = label;
    });

    resume.basics.top_five_profiles = resume.basics.profiles.slice(0, 5);
    resume.basics.remaining_profiles = resume.basics.profiles.slice(5);

    _.each(resume.work, function(work_info) {
        var duration;
        var start_date = work_info.startDate;
        var end_date = work_info.endDate;
        var did_leave_company = !!end_date;

        if (end_date) {
            work_info.endDate = utils.getFormattedDate(end_date);
        }

        if (start_date) {
            end_date = end_date || new Date();
            duration = utils.getDuration(start_date, end_date);
            work_info.startDate = utils.getFormattedDate(start_date);

            if (!duration.years() && !duration.months() && duration.days() > 1) {
                work_info.duration = 'Recently joined';
            } else {
                work_info.duration = utils.getDuration(start_date, end_date, true);
            }
        }
    });

    _.each(resume.education, function(education_info) {
        _.each(['startDate', 'endDate'], function(type) {
            var date = education_info[type];

            if (date) {
                education_info[type] = utils.getFormattedDate(date);
            }
        });
    });

    _.each(resume.awards, function(award) {
        var date = award.date;

        if (date) {
            award.date = utils.getFormattedDate(date, 'MMM DD, YYYY');
        }
    });

    _.each(resume.volunteer, function(volunteer_info) {
        _.each(['startDate', 'endDate'], function (type) {
            var date = volunteer_info[type];

            if (date) {
                volunteer_info[type] = utils.getFormattedDate(date);
            }
        });
    });

    _.each(resume.publications, function(publication_info) {
        var date = publication_info.releaseDate;

        if (date) {
            publication_info.releaseDate = utils.getFormattedDate(date, 'MMM DD, YYYY');
        }
    });

    return jade.renderFile('index.jade', {
      resume: resume,
      floating_nav_items: getFloatingNavItems(resume),
      css: css
    });
}

module.exports = {
    render: render
};
