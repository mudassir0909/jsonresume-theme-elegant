var fs = require('fs');
var pug = require('pug');
var _ = require('underscore');
var utils = require('jsonresume-themeutils');
var moment = require('moment');
var markdown = require('markdown-it')({
    breaks: true
}).use(require('markdown-it-abbr'));

require('./moment-precise-range.js');

utils.setConfig({
    date_format: 'MMM, YYYY'
});

function interpolate(object, keyPath) {
    var keys = keyPath.split('.');

    return _(keys).reduce(function(res, key) {
        return (res || {})[key];
    }, object);
}

function capitalize(str) {
    if (str) {
        str = str.toString();
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
    }

    return str;
}

function convertMarkdown(str) {
    if (str != null) {
        return markdown.render(str);
    }
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
        var value = interpolate(resume, item.requires);

        return !_.isEmpty(value);
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

    resume.basics.summary = convertMarkdown(resume.basics.summary);

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
        var start_date = moment(work_info.startDate, "YYYY-MM-DD");
        var end_date = moment(work_info.endDate, "YYYY-MM-DD");
        var can_calculate_period = start_date.isValid() && end_date.isValid();

        if (can_calculate_period) {
            work_info.duration = moment.preciseDiff(start_date, end_date);
        }

        if (start_date.isValid()) {
          work_info.startDate = utils.getFormattedDate(start_date);
        }

        if (end_date.isValid()) {
          work_info.endDate = utils.getFormattedDate(end_date);
        }

        work_info.summary = convertMarkdown(work_info.summary);

        work_info.highlights = _(work_info.highlights).map(function(highlight) {
            return convertMarkdown(highlight);
        });
    });

    _.each(resume.skills, function(skill_info) {
        var levels = ['Beginner', 'Intermediate', 'Advanced', 'Master'];

        if (skill_info.level) {
            skill_info.skill_class = skill_info.level.toLowerCase();
            skill_info.level = capitalize(skill_info.level.trim());
            skill_info.display_progress_bar = _.contains(levels, skill_info.level);
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

        award.summary = convertMarkdown(award.summary);

        if (date) {
            award.date = utils.getFormattedDate(date, 'MMM DD, YYYY');
        }
    });

    _.each(resume.volunteer, function(volunteer_info) {
        volunteer_info.summary = convertMarkdown(volunteer_info.summary);

        _.each(['startDate', 'endDate'], function (type) {
            var date = volunteer_info[type];

            if (date) {
                volunteer_info[type] = utils.getFormattedDate(date);
            }
        });

        volunteer_info.highlights = _(volunteer_info.highlights).map(function(highlight) {
            return convertMarkdown(highlight);
        });
    });

    _.each(resume.publications, function(publication_info) {
        var date = publication_info.releaseDate;

        publication_info.summary = convertMarkdown(publication_info.summary);

        if (date) {
            publication_info.releaseDate = utils.getFormattedDate(date, 'MMM DD, YYYY');
        }
    });

    _.each(resume.references, function(reference_info) {
        reference_info.reference = convertMarkdown(reference_info.reference);
    });

    return pug.renderFile(__dirname + '/index.pug', {
      resume: resume,
      floating_nav_items: getFloatingNavItems(resume),
      css: css,
      _: _
    });
}

module.exports = {
    render: render
};
