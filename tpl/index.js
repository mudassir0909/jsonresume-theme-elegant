function pug_attr(t,e,n,r){if(!1===e||null==e||!e&&("class"===t||"style"===t))return"";if(!0===e)return" "+(r?t:t+'="'+t+'"');var f=typeof e;return"object"!==f&&"function"!==f||"function"!=typeof e.toJSON||(e=e.toJSON()),"string"==typeof e||(e=JSON.stringify(e),n||-1===e.indexOf('"'))?(n&&(e=pug_escape(e))," "+t+'="'+e+'"'):" "+t+"='"+e.replace(/'/g,"&#39;")+"'"}
function pug_classes(s,r){return Array.isArray(s)?pug_classes_array(s,r):s&&"object"==typeof s?pug_classes_object(s):s||""}
function pug_classes_array(r,a){for(var s,e="",u="",c=Array.isArray(a),g=0;g<r.length;g++)(s=pug_classes(r[g]))&&(c&&a[g]&&(s=pug_escape(s)),e=e+u+s,u=" ");return e}
function pug_classes_object(r){var a="",n="";for(var o in r)o&&r[o]&&pug_has_own_property.call(r,o)&&(a=a+n+o,n=" ");return a}
function pug_escape(e){var a=""+e,t=pug_match_html.exec(a);if(!t)return e;var r,c,n,s="";for(r=t.index,c=0;r<a.length;r++){switch(a.charCodeAt(r)){case 34:n="&quot;";break;case 38:n="&amp;";break;case 60:n="&lt;";break;case 62:n="&gt;";break;default:continue}c!==r&&(s+=a.substring(c,r)),c=r+1,s+=n}return c!==r?s+a.substring(c,r):s}
var pug_has_own_property=Object.prototype.hasOwnProperty;
var pug_match_html=/["&<>]/;
function pug_rethrow(n,e,r,t){if(!(n instanceof Error))throw n;if(!("undefined"==typeof window&&e||t))throw n.message+=" on line "+r,n;try{t=t||require("fs").readFileSync(e,"utf8")}catch(e){pug_rethrow(n,null,r)}var i=3,a=t.split("\n"),o=Math.max(r-i,0),h=Math.min(a.length,r+i),i=a.slice(o,h).map(function(n,e){var t=e+o+1;return(t==r?"  > ":"    ")+t+"| "+n}).join("\n");throw n.path=e,n.message=(e||"Pug")+":"+r+"\n"+i+"\n\n"+n.message,n}function template(locals) {var pug_html = "", pug_mixins = {}, pug_interp;var pug_debug_filename, pug_debug_line;try {var pug_debug_sources = {"index.pug":"|\u003C!DOCTYPE html\u003E\nhtml(lang=\"en\")\n  head\n    meta(charset=\"utf-8\")\n    meta(http-equiv=\"X-UA-Compatible\", content=\"IE=edge\")\n    meta(name=\"viewport\", content=\"width=device-width, initial-scale=1\")\n    title= resume.basics.name\n    include pug\u002Fstylesheets.pug\n\n  body(itemscope, itemtype=\"http:\u002F\u002Fschema.org\u002FPerson\")\n    .container-fluid\n      .row.main.clearfix\n        include pug\u002Ffloating-nav.pug\n        include pug\u002Fprofile-card.pug\n        include pug\u002Fbackground-card.pug\n\n    include pug\u002Fscripts.pug\n","pug\u002Fstylesheets.pug":"link(rel=\"stylesheet\", href=\"https:\u002F\u002Fmaxcdn.bootstrapcdn.com\u002Fbootstrap\u002F3.3.6\u002Fcss\u002Fbootstrap.min.css\")\nstyle!= css\n","pug\u002Ffloating-nav.pug":"mixin make_nav_link(nav_item)\n  li\n    a(href=\"#\" + nav_item.target)\n      i.mr-10(class='icon-' + nav_item.icon)\n      | #{nav_item.label}\n\na(href=\"#\").js-floating-nav-trigger.floating-nav-trigger\n  i.icon-bars\n  span.close-icon &times;\n\nnav.floating-nav.js-floating-nav\n  ul.list-unstyled\n    each nav_item in floating_nav_items\n      +make_nav_link(nav_item)\n","pug\u002Fprofile-card.pug":"mixin profile_card_detail(icon, info, itemprop, icon_title)\n  .detail\n    span.icon(title=icon_title)\n      i.icon.fs-lg(class=icon)\n    span.info(itemprop=itemprop)\n      if block\n        block\n      else\n        |#{info}\n\nmixin render_links(profiles)\n  each profile in profiles\n    a.fs-2x.social-link(\n      href=profile.url,\n      target=\"_blank\",\n      data-toggle=\"tooltip\",\n      title= resume.basics.name + \" on \" + profile.network,\n      class=\"link-\" + profile.label + \" icon-\" + profile.label)\n      if profile.network.toLowerCase() == 'meetup'\n        span.path2\n        span.path3\n      if profile.network.toLowerCase() == 'gitlab'\n        span.path1\n        span.path2\n        span.path3\n        span.path4\n        span.path5\n        span.path6\n        span.path7\n        span.path8\n\nsection.col-md-3.card-wrapper.profile-card-wrapper.affix\n  .card.profile-card\n    span.profile-pic-container\n      .profile-pic\n        img.media-object.img-circle.center-block(\n          data-src=\"holder.js\u002F100x100\",\n          alt=resume.basics.name,\n          src=resume.basics.picture,\n          itemprop=\"image\")\n\n      .name-and-profession.text-center\n        h3(itemprop=\"name\"): b= resume.basics.name\n        h5.text-muted(itemprop=\"jobTitle\")= resume.basics.label\n\n    hr\n\n    .contact-details.clearfix\n      if resume.basics.computed_location\n        +profile_card_detail(\"icon-location\", resume.basics.computed_location)\n      if resume.basics.phone\n        +profile_card_detail(\"icon-phone\", resume.basics.phone, \"telephone\")\n      if resume.basics.email\n        +profile_card_detail(\"icon-mail\")\n          a.link-disguise(href=\"mailto:\" + resume.basics.email, itemprop=\"email\")= resume.basics.email\n      if resume.basics.website\n        +profile_card_detail(\"icon-link\")\n          a(href=resume.basics.website, target=\"_blank\")= resume.basics.website\n      if resume.basics.languages\n        +profile_card_detail('icon-language', resume.basics.languages, null, 'Languages I speak')\n\n    hr\n\n    .social-links.text-center\n      div\n        +render_links(resume.basics.top_five_profiles)\n\n        if resume.basics.remaining_profiles.length \u003E 0\n          button.btn.btn-default.btn-sm.btn-circle-sm.pull-right.js-profiles-collapse(\n            data-toggle=\"collapse\",\n            data-target=\"#remaining-profiles\")\n            i.icon-chevron-down.fs-lg\n\n          #remaining-profiles.collapse.text-left\n            +render_links(resume.basics.remaining_profiles)\n","pug\u002Fbackground-card.pug":"section.col-md-9.card-wrapper.pull-right\n  .card.background-card\n    h4.text-uppercase Background\n    hr\n\n    .background-details\n      include background\u002Fabout.pug\n      include background\u002Fwork-experience.pug\n      include background\u002Fprojects-experience.pug\n      include background\u002Fskills.pug\n      include background\u002Feducation.pug\n      include background\u002Fcertificates.pug\n      include background\u002Fawards.pug\n      include background\u002Fvolunteer-work.pug\n      include background\u002Fpublications.pug\n      include background\u002Finterests.pug\n      include background\u002Freferences.pug\n","pug\u002Fbackground\u002Fabout.pug":"unless _.isEmpty(resume.basics.summary)\n  .detail#about\n    .icon\n      i.fs-lg.icon-board\n      span.mobile-title About\n    .info\n      h4.title.text-uppercase About\n\n      .card.card-nested\n        .content.mop-wrapper(itemprop=\"description\")!= resume.basics.summary\n","pug\u002Fbackground\u002Fwork-experience.pug":"unless _.isEmpty(resume.work)\n  .detail#work-experience\n    .icon\n      i.fs-lg.icon-office\n      span.mobile-title Work Experience\n\n    .info\n      h4.title.text-uppercase Work Experience\n\n      ul.list-unstyled.clear-margin\n        each experience in resume.work\n          li.card.card-nested.clearfix\n            .content\n              p.clear-margin.relative\n                if !experience.endDate\n                  i.icon-circle.current-event(\n                    rel=\"tooltip\",\n                    title=\"Currently Working\",\n                    data-placement=\"left\"\n                  )\n                strong= experience.position\n                |,&nbsp;\n                if experience.url\n                  a(href=experience.url, target=\"_blank\")= experience.name\n                else\n                  |#{experience.name}\n\n              p.text-muted\n                small\n                  span.space-right\n                    |#{experience.startDate} - #{experience.endDate || 'Present'}\n\n                  if experience.duration\n                    span\n                      i.icon-clock.mr-5\n                      |#{experience.duration}\n\n              .mop-wrapper.space-bottom!= experience.summary\n\n              unless _.isEmpty(experience.highlights)\n                ul\n                  each highlight in experience.highlights\n                    li.mop-wrapper!= highlight\n","pug\u002Fbackground\u002Fprojects-experience.pug":"unless _.isEmpty(resume.projects)\n  .detail#projects-experience\n    .icon\n      i.fs-lg.icon-code\n      span.mobile-title Projects Experience\n\n    .info\n      h4.title.text-uppercase Projects Experience\n\n      ul.list-unstyled.clear-margin\n        each project in resume.projects\n          li.card.card-nested.clearfix\n            .content\n              p.clear-margin.relative\n                if !project.endDate\n                  i.icon-circle.current-event(\n                    rel=\"tooltip\",\n                    title=\"Currently Working\",\n                    data-placement=\"left\"\n                  )\n                if project.url\n                  a(href=project.url, target=\"_blank\")\n                    strong=project.name\n                else\n                  strong=project.name\n                if project.entity\n                  span\n                    |,&nbsp;#{project.entity}\n\n              p.text-muted\n                small\n                  span.space-right\n                    |#{project.startDate} - #{project.endDate || 'Present'}\n\n                  if project.duration\n                    span\n                      i.icon-clock.mr-5\n                      |#{project.duration}\n\n              .mop-wrapper.space-bottom!= project.description\n\n              unless _.isEmpty(project.highlights)\n                ul\n                  each highlight in project.highlights\n                    li.mop-wrapper!= highlight\n","pug\u002Fbackground\u002Fskills.pug":"unless _.isEmpty(resume.skills)\n  .detail#skills\n    .icon\n      i.fs-lg.icon-tools\n      span.mobile-title Skills\n\n    .info\n      h4.title.text-uppercase Skills\n\n      .content\n        ul.list-unstyled.clear-margin\n          each skill in resume.skills\n            li.card.card-nested.card-skills\n              if skill.display_progress_bar\n                .skill-level(data-toggle=\"tooltip\", title=skill.level, data-placement=\"left\")\n                  .skill-progress(class=skill.skill_class)\n\n              .skill-info\n                strong= skill.name\n\n                unless _.isEmpty(skill.keywords)\n                  .space-top.labels\n                    each keyword in skill.keywords\n                      span.label.label-keyword!= keyword\n","pug\u002Fbackground\u002Feducation.pug":"unless _.isEmpty(resume.education)\n  .detail#education\n    .icon\n      i.fs-lg.icon-graduation-cap\n      span.mobile-title Education\n\n    .info\n      h4.title.text-uppercase Education\n\n      .content\n        ul.list-unstyled.clear-margin\n          each education_info in resume.education\n            li.card.card-nested\n              .content\n                p.clear-margin.relative\n                  if !education_info.endDate\n                    i.icon-circle.current-event(\n                      rel=\"tooltip\",\n                      title=\"Currently Pursuing\",\n                      data-placement=\"left\"\n                    )\n\n                  strong\n                    |#{education_info.area}, #{education_info.studyType},&nbsp;\n                  |#{education_info.institution}\n\n                p.text-muted(class=!education_info.gpa && _.isEmpty(education_info.courses) ? 'clear-margin' : '')\n                  small\n                    |#{education_info.startDate} - #{education_info.endDate || 'Present'}\n                i= education_info.gpa\n\n                unless _.isEmpty(education_info.courses)\n                  .space-top.labels\n                    each course in education_info.courses\n                      span.label.label-keyword!= course\n\n","pug\u002Fbackground\u002Fcertificates.pug":"unless _.isEmpty(resume.certificates)\n  .detail#certificates\n    .icon\n      i.fs-lg.icon-profile\n      span.mobile-title Certificates\n\n    .info\n      h4.title.text-uppercase Certificates\n\n      .content\n        ul.list-unstyled.clear-margin\n          each certificate in resume.certificates\n            li.card.card-nested\n              .content\n                p.clear-margin(itemprop=\"certificate\")\n                  strong\n                    if certificate.url\n                      a(href=certificate.url, target=\"_blank\")= certificate.name\n                      |,&nbsp;\n                    else\n                      |#{certificate.name + ', '}\n                  |#{certificate.issuer}\n\n                p.text-muted\n                  small\n                    |Issued on: #{certificate.date}\n","pug\u002Fbackground\u002Fawards.pug":"unless _.isEmpty(resume.awards)\n  .detail#awards\n    .icon\n      i.fs-lg.icon-trophy\n      span.mobile-title Awards\n\n    .info\n      h4.title.text-uppercase Awards\n\n      .content\n        ul.list-unstyled.clear-margin\n          each award in resume.awards\n            li.card.card-nested\n              .content\n                p.clear-margin(itemprop=\"award\")\n                  strong= award.title + \" \"\n                  |,&nbsp;#{award.awarder}\n\n                p.text-muted\n                  small\n                    |Awarded on: #{award.date}\n\n                .mop-wrapper!= award.summary\n","pug\u002Fbackground\u002Fvolunteer-work.pug":"unless _.isEmpty(resume.volunteer)\n  .detail#volunteer-work\n    .icon\n      i.fs-lg.icon-child\n      span.mobile-title Volunteer Work\n\n    .info\n      h4.title.text-uppercase Volunteer Work\n\n      .content\n        ul.list-unstyled.clear-margin\n          each volunteer_info in resume.volunteer\n            li.card.card-nested\n              .content\n                p.clear-margin.relative\n                  if !volunteer_info.endDate\n                    i.icon-circle.current-event(\n                      rel=\"tooltip\",\n                      title=\"Currently Volunteering\",\n                      data-placement=\"left\"\n                    )\n\n                  strong= volunteer_info.position + ', '\n                  if volunteer_info.website\n                    a(href=volunteer_info.website, target=\"_blank\")= volunteer_info.organization\n                  else\n                    |#{volunteer_info.organization}\n\n                p.text-muted\n                  small\n                    |#{volunteer_info.startDate} - #{volunteer_info.endDate || 'Present'}\n\n                .mop-wrapper!= volunteer_info.summary\n\n                unless _.isEmpty(volunteer_info.highlights)\n                  ul\n                    each highlight in volunteer_info.highlights\n                      li.mop-wrapper!= highlight\n","pug\u002Fbackground\u002Fpublications.pug":"\nunless _.isEmpty(resume.publications)\n  .detail#publications\n    .icon\n      i.fs-lg.icon-newspaper\n      span.mobile-title Publications\n\n    .info\n      h4.title.text-uppercase Publications\n\n      .content\n        ul.list-unstyled.clear-margin\n          each publication in resume.publications\n            li.card.card-nested\n              .content\n                p.clear-margin\n                  strong\n                    if publication.url\n                      a(href=publication.url, target=\"_blank\")= publication.name\n                      |&nbsp;,&nbsp;\n                    else\n                      |#{publication.name + ', '}\n                  |#{publication.publisher}\n\n                p.text-muted\n                  small= 'Published on: ' + publication.releaseDate\n\n                .mop-wrapper!= publication.summary\n","pug\u002Fbackground\u002Finterests.pug":"unless _.isEmpty(resume.interests)\n  .detail#interests\n    .icon\n      i.fs-lg.icon-heart\n      span.mobile-title Interests\n\n    .info\n      h4.title.text-uppercase Interests\n\n      .content\n        ul.list-unstyled.clear-margin\n          each interest in resume.interests\n            li.card.card-nested\n              p\n                strong= interest.name\n\n              unless _.isEmpty(interest.keywords)\n                .space-top.labels\n                  each keyword in interest.keywords\n                    span.label.label-keyword= keyword\n","pug\u002Fbackground\u002Freferences.pug":"unless _.isEmpty(resume.references)\n  .detail#references\n    .icon\n      i.fs-lg.icon-thumbs-up\n      span.mobile-title References\n\n    .info\n      h4.title.text-uppercase References\n\n      .content\n        ul.list-unstyled.clear-margin\n          each reference_info in resume.references\n            li.card.card-nested\n              if reference_info.website\n                a(href=reference_info.website, target=\"_blank\")= reference_info.name\n              else\n                |#{reference_info.name}\n\n              blockquote.quote\n                .mop-wrapper!= reference_info.reference\n","pug\u002Fscripts.pug":"script(src=\"https:\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fjquery\u002F1.11.0\u002Fjquery.min.js\")\nscript(src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ftwitter-bootstrap\u002F3.3.6\u002Fjs\u002Fbootstrap.min.js\")\n\nscript.\n  $(function () {\n    var toggleFloatingMenu = function() {\n      $( '.js-floating-nav' ).toggleClass( 'is-visible' );\n      $( '.js-floating-nav-trigger' ).toggleClass( 'is-open' );\n    };\n\n    $( \".background-card\" ).css( \"min-height\", window.screen.availHeight + \"px\" );\n    $( \"[data-toggle=tooltip]\" ).tooltip();\n    $( '.js-floating-nav-trigger' ).on( 'click', function(e) {\n      e.preventDefault();\n      toggleFloatingMenu();\n    });\n    $( '.js-floating-nav a' ).on( 'click', toggleFloatingMenu );\n\n    $(\"#remaining-profiles\").on('show.bs.collapse', function() {\n      $( '.js-profiles-collapse \u003E i' )\n        .removeClass( 'icon-chevron-down' )\n        .addClass( 'icon-chevron-up' );\n    });\n\n    $(\"#remaining-profiles\").on('hidden.bs.collapse', function() {\n      $( '.js-profiles-collapse \u003E i' )\n        .removeClass( 'icon-chevron-up' )\n        .addClass( 'icon-chevron-down' );\n    });\n  });\n\nscript.\n  WebFontConfig = {\n    google: { families: [ 'Lato:300,400,700:latin' ] }\n  };\n  (function() {\n    var wf = document.createElement('script');\n    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +\n      ':\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fwebfont\u002F1\u002Fwebfont.js';\n    wf.type = 'text\u002Fjavascript';\n    wf.async = 'true';\n    var s = document.getElementsByTagName('script')[0];\n    s.parentNode.insertBefore(wf, s);\n  })();\n"};
;var locals_for_with = (locals || {});(function (_, css, floating_nav_items, resume) {;pug_debug_line = 1;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003C!DOCTYPE html\u003E";
;pug_debug_line = 2;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Chtml lang=\"en\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Chead\u003E";
;pug_debug_line = 4;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta charset=\"utf-8\"\u002F\u003E";
;pug_debug_line = 5;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\"\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cmeta name=\"viewport\" content=\"width=device-width, initial-scale=1\"\u002F\u003E";
;pug_debug_line = 7;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Ctitle\u003E";
;pug_debug_line = 7;pug_debug_filename = "index.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.name) ? "" : pug_interp)) + "\u003C\u002Ftitle\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fstylesheets.pug";
pug_html = pug_html + "\u003Clink rel=\"stylesheet\" href=\"https:\u002F\u002Fmaxcdn.bootstrapcdn.com\u002Fbootstrap\u002F3.3.6\u002Fcss\u002Fbootstrap.min.css\"\u002F\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fstylesheets.pug";
pug_html = pug_html + "\u003Cstyle\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fstylesheets.pug";
pug_html = pug_html + (null == (pug_interp = css) ? "" : pug_interp) + "\u003C\u002Fstyle\u003E\u003C\u002Fhead\u003E";
;pug_debug_line = 10;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cbody" + (pug_attr("itemscope", true, true, false)+" itemtype=\"http:\u002F\u002Fschema.org\u002FPerson\"") + "\u003E";
;pug_debug_line = 11;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cdiv class=\"container-fluid\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "index.pug";
pug_html = pug_html + "\u003Cdiv class=\"row main clearfix\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_mixins["make_nav_link"] = pug_interp = function(nav_item){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Cli\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", "#" + nav_item.target, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes(["mr-10",'icon-' + nav_item.icon], [false,true]), false, false)) + "\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = nav_item.label) ? "" : pug_interp)) + "\u003C\u002Fa\u003E\u003C\u002Fli\u003E";
};
;pug_debug_line = 7;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Ca class=\"js-floating-nav-trigger floating-nav-trigger\" href=\"#\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Ci class=\"icon-bars\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Cspan class=\"close-icon\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "&times;\u003C\u002Fspan\u003E\u003C\u002Fa\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Cnav class=\"floating-nav js-floating-nav\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Ffloating-nav.pug";
// iterate floating_nav_items
;(function(){
  var $$obj = floating_nav_items;
  if ('number' == typeof $$obj.length) {
      for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
        var nav_item = $$obj[pug_index0];
;pug_debug_line = 14;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_mixins["make_nav_link"](nav_item);
      }
  } else {
    var $$l = 0;
    for (var pug_index0 in $$obj) {
      $$l++;
      var nav_item = $$obj[pug_index0];
;pug_debug_line = 14;pug_debug_filename = "pug\u002Ffloating-nav.pug";
pug_mixins["make_nav_link"](nav_item);
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fnav\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["profile_card_detail"] = pug_interp = function(icon, info, itemprop, icon_title){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan" + (" class=\"icon\""+pug_attr("title", icon_title, true, false)) + "\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ci" + (pug_attr("class", pug_classes(["icon","fs-lg",icon], [false,false,true]), false, false)) + "\u003E\u003C\u002Fi\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan" + (" class=\"info\""+pug_attr("itemprop", itemprop, true, false)) + "\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (block) {
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fprofile-card.pug";
block && block();
}
else {
;pug_debug_line = 9;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = info) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
};
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["render_links"] = pug_interp = function(profiles){
var block = (this && this.block), attributes = (this && this.attributes) || {};
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fprofile-card.pug";
// iterate profiles
;(function(){
  var $$obj = profiles;
  if ('number' == typeof $$obj.length) {
      for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
        var profile = $$obj[pug_index1];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes(["fs-2x","social-link","link-" + profile.label + " icon-" + profile.label], [false,false,true]), false, false)+pug_attr("href", profile.url, true, false)+" target=\"_blank\" data-toggle=\"tooltip\""+pug_attr("title", resume.basics.name + " on " + profile.network, true, false)) + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (profile.network.toLowerCase() == 'meetup') {
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
}
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (profile.network.toLowerCase() == 'gitlab') {
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path1\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path4\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path5\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path6\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path7\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path8\"\u003E\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index1 in $$obj) {
      $$l++;
      var profile = $$obj[pug_index1];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("class", pug_classes(["fs-2x","social-link","link-" + profile.label + " icon-" + profile.label], [false,false,true]), false, false)+pug_attr("href", profile.url, true, false)+" target=\"_blank\" data-toggle=\"tooltip\""+pug_attr("title", resume.basics.name + " on " + profile.network, true, false)) + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (profile.network.toLowerCase() == 'meetup') {
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
}
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (profile.network.toLowerCase() == 'gitlab') {
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path1\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path2\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path3\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path4\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path5\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path6\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path7\"\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"path8\"\u003E\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fa\u003E";
    }
  }
}).call(this);

};
;pug_debug_line = 32;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Csection class=\"col-md-3 card-wrapper profile-card-wrapper affix\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"card profile-card\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cspan class=\"profile-pic-container\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"profile-pic\"\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cimg" + (" class=\"media-object img-circle center-block\""+" data-src=\"holder.js\u002F100x100\""+pug_attr("alt", resume.basics.name, true, false)+pug_attr("src", resume.basics.picture, true, false)+" itemprop=\"image\"") + "\u002F\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"name-and-profession text-center\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ch3 itemprop=\"name\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cb\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.name) ? "" : pug_interp)) + "\u003C\u002Fb\u003E\u003C\u002Fh3\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ch5 class=\"text-muted\" itemprop=\"jobTitle\"\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.label) ? "" : pug_interp)) + "\u003C\u002Fh5\u003E\u003C\u002Fdiv\u003E\u003C\u002Fspan\u003E";
;pug_debug_line = 46;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 48;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"contact-details clearfix\"\u003E";
;pug_debug_line = 49;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (resume.basics.computed_location) {
;pug_debug_line = 50;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["profile_card_detail"]("icon-location", resume.basics.computed_location);
}
;pug_debug_line = 51;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (resume.basics.phone) {
;pug_debug_line = 52;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["profile_card_detail"]("icon-phone", resume.basics.phone, "telephone");
}
;pug_debug_line = 53;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (resume.basics.email) {
;pug_debug_line = 54;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["profile_card_detail"].call({
block: function(){
;pug_debug_line = 55;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ca" + (" class=\"link-disguise\""+pug_attr("href", "mailto:" + resume.basics.email, true, false)+" itemprop=\"email\"") + "\u003E";
;pug_debug_line = 55;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.email) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}, "icon-mail");
}
;pug_debug_line = 56;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (resume.basics.website) {
;pug_debug_line = 57;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["profile_card_detail"].call({
block: function(){
;pug_debug_line = 58;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", resume.basics.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 58;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = resume.basics.website) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
}, "icon-link");
}
;pug_debug_line = 59;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (resume.basics.languages) {
;pug_debug_line = 60;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["profile_card_detail"]('icon-language', resume.basics.languages, null, 'Languages I speak');
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 62;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 64;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"social-links text-center\"\u003E";
;pug_debug_line = 65;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv\u003E";
;pug_debug_line = 66;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["render_links"](resume.basics.top_five_profiles);
;pug_debug_line = 68;pug_debug_filename = "pug\u002Fprofile-card.pug";
if (resume.basics.remaining_profiles.length > 0) {
;pug_debug_line = 69;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cbutton class=\"btn btn-default btn-sm btn-circle-sm pull-right js-profiles-collapse\" data-toggle=\"collapse\" data-target=\"#remaining-profiles\"\u003E";
;pug_debug_line = 72;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Ci class=\"icon-chevron-down fs-lg\"\u003E\u003C\u002Fi\u003E\u003C\u002Fbutton\u003E";
;pug_debug_line = 74;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"collapse text-left\" id=\"remaining-profiles\"\u003E";
;pug_debug_line = 75;pug_debug_filename = "pug\u002Fprofile-card.pug";
pug_mixins["render_links"](resume.basics.remaining_profiles);
pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground-card.pug";
pug_html = pug_html + "\u003Csection class=\"col-md-9 card-wrapper pull-right\"\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"card background-card\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground-card.pug";
pug_html = pug_html + "\u003Ch4 class=\"text-uppercase\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground-card.pug";
pug_html = pug_html + "Background\u003C\u002Fh4\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground-card.pug";
pug_html = pug_html + "\u003Chr\u002F\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fbackground-card.pug";
pug_html = pug_html + "\u003Cdiv class=\"background-details\"\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
if (!(_.isEmpty(resume.basics.summary))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"about\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-board\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "About\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "About\u003C\u002Fh4\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"card card-nested\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + "\u003Cdiv class=\"content mop-wrapper\" itemprop=\"description\"\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fabout.pug";
pug_html = pug_html + (null == (pug_interp = resume.basics.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (!(_.isEmpty(resume.work))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"work-experience\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-office\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "Work Experience\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "Work Experience\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
// iterate resume.work
;(function(){
  var $$obj = resume.work;
  if ('number' == typeof $$obj.length) {
      for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
        var experience = $$obj[pug_index2];
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (!experience.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.position) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (experience.url) {
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", experience.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (experience.duration) {
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (null == (pug_interp = experience.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (!(_.isEmpty(experience.highlights))) {
;pug_debug_line = 41;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
// iterate experience.highlights
;(function(){
  var $$obj = experience.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
        var highlight = $$obj[pug_index3];
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index3 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index3];
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index2 in $$obj) {
      $$l++;
      var experience = $$obj[pug_index2];
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (!experience.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.position) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (experience.url) {
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", experience.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.name) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (experience.duration) {
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = experience.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (null == (pug_interp = experience.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
if (!(_.isEmpty(experience.highlights))) {
;pug_debug_line = 41;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
// iterate experience.highlights
;(function(){
  var $$obj = experience.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
        var highlight = $$obj[pug_index4];
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index4 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index4];
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fwork-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (!(_.isEmpty(resume.projects))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"projects-experience\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-code\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "Projects Experience\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "Projects Experience\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
// iterate resume.projects
;(function(){
  var $$obj = resume.projects;
  if ('number' == typeof $$obj.length) {
      for (var pug_index5 = 0, $$l = $$obj.length; pug_index5 < $$l; pug_index5++) {
        var project = $$obj[pug_index5];
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (!project.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (project.url) {
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", project.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
}
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (project.entity) {
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.entity) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.startDate) ? "" : pug_interp));
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (project.duration) {
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (null == (pug_interp = project.description) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (!(_.isEmpty(project.highlights))) {
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
// iterate project.highlights
;(function(){
  var $$obj = project.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index6 = 0, $$l = $$obj.length; pug_index6 < $$l; pug_index6++) {
        var highlight = $$obj[pug_index6];
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index6 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index6];
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index5 in $$obj) {
      $$l++;
      var project = $$obj[pug_index5];
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested clearfix\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (!project.endDate) {
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Working\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (project.url) {
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", project.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
}
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (project.entity) {
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.entity) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan class=\"space-right\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.startDate) ? "" : pug_interp));
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (project.duration) {
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cspan\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Ci class=\"icon-clock mr-5\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = project.duration) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
}
pug_html = pug_html + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper space-bottom\"\u003E";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (null == (pug_interp = project.description) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
if (!(_.isEmpty(project.highlights))) {
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 44;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
// iterate project.highlights
;(function(){
  var $$obj = project.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index7 = 0, $$l = $$obj.length; pug_index7 < $$l; pug_index7++) {
        var highlight = $$obj[pug_index7];
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index7 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index7];
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 45;pug_debug_filename = "pug\u002Fbackground\u002Fprojects-experience.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
if (!(_.isEmpty(resume.skills))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"skills\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-tools\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "Skills\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "Skills\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
// iterate resume.skills
;(function(){
  var $$obj = resume.skills;
  if ('number' == typeof $$obj.length) {
      for (var pug_index8 = 0, $$l = $$obj.length; pug_index8 < $$l; pug_index8++) {
        var skill = $$obj[pug_index8];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested card-skills\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
if (skill.display_progress_bar) {
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"skill-level\""+" data-toggle=\"tooltip\""+pug_attr("title", skill.level, true, false)+" data-placement=\"left\"") + "\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["skill-progress",skill.skill_class], [false,true]), false, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"skill-info\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = skill.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
if (!(_.isEmpty(skill.keywords))) {
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
// iterate skill.keywords
;(function(){
  var $$obj = skill.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index9 = 0, $$l = $$obj.length; pug_index9 < $$l; pug_index9++) {
        var keyword = $$obj[pug_index9];
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index9 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index9];
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index8 in $$obj) {
      $$l++;
      var skill = $$obj[pug_index8];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested card-skills\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
if (skill.display_progress_bar) {
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv" + (" class=\"skill-level\""+" data-toggle=\"tooltip\""+pug_attr("title", skill.level, true, false)+" data-placement=\"left\"") + "\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv" + (pug_attr("class", pug_classes(["skill-progress",skill.skill_class], [false,true]), false, false)) + "\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"skill-info\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = skill.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
if (!(_.isEmpty(skill.keywords))) {
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
// iterate skill.keywords
;(function(){
  var $$obj = skill.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index10 = 0, $$l = $$obj.length; pug_index10 < $$l; pug_index10++) {
        var keyword = $$obj[pug_index10];
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index10 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index10];
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fskills.pug";
pug_html = pug_html + (null == (pug_interp = keyword) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
if (!(_.isEmpty(resume.education))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"education\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-graduation-cap\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "Education\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "Education\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
// iterate resume.education
;(function(){
  var $$obj = resume.education;
  if ('number' == typeof $$obj.length) {
      for (var pug_index11 = 0, $$l = $$obj.length; pug_index11 < $$l; pug_index11++) {
        var education_info = $$obj[pug_index11];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
if (!education_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Pursuing\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.area) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + ", ";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.studyType) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + ",&nbsp;\u003C\u002Fstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.institution) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("class", pug_classes(["text-muted",!education_info.gpa && _.isEmpty(education_info.courses) ? 'clear-margin' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.startDate) ? "" : pug_interp));
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Ci\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.gpa) ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
if (!(_.isEmpty(education_info.courses))) {
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
// iterate education_info.courses
;(function(){
  var $$obj = education_info.courses;
  if ('number' == typeof $$obj.length) {
      for (var pug_index12 = 0, $$l = $$obj.length; pug_index12 < $$l; pug_index12++) {
        var course = $$obj[pug_index12];
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index12 in $$obj) {
      $$l++;
      var course = $$obj[pug_index12];
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index11 in $$obj) {
      $$l++;
      var education_info = $$obj[pug_index11];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
if (!education_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Pursuing\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.area) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + ", ";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.studyType) ? "" : pug_interp));
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + ",&nbsp;\u003C\u002Fstrong\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.institution) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cp" + (pug_attr("class", pug_classes(["text-muted",!education_info.gpa && _.isEmpty(education_info.courses) ? 'clear-margin' : ''], [false,true]), false, false)) + "\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.startDate) ? "" : pug_interp));
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Ci\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = education_info.gpa) ? "" : pug_interp)) + "\u003C\u002Fi\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
if (!(_.isEmpty(education_info.courses))) {
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
// iterate education_info.courses
;(function(){
  var $$obj = education_info.courses;
  if ('number' == typeof $$obj.length) {
      for (var pug_index13 = 0, $$l = $$obj.length; pug_index13 < $$l; pug_index13++) {
        var course = $$obj[pug_index13];
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index13 in $$obj) {
      $$l++;
      var course = $$obj[pug_index13];
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Feducation.pug";
pug_html = pug_html + (null == (pug_interp = course) ? "" : pug_interp) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
if (!(_.isEmpty(resume.certificates))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"certificates\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-profile\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "Certificates\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "Certificates\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
// iterate resume.certificates
;(function(){
  var $$obj = resume.certificates;
  if ('number' == typeof $$obj.length) {
      for (var pug_index14 = 0, $$l = $$obj.length; pug_index14 < $$l; pug_index14++) {
        var certificate = $$obj[pug_index14];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"certificate\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
if (certificate.url) {
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", certificate.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + ",&nbsp;";
}
else {
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.issuer) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "Issued on: ";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index14 in $$obj) {
      $$l++;
      var certificate = $$obj[pug_index14];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"certificate\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
if (certificate.url) {
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", certificate.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + ",&nbsp;";
}
else {
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.issuer) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + "Issued on: ";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fcertificates.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = certificate.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
if (!(_.isEmpty(resume.awards))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"awards\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-trophy\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "Awards\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "Awards\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
// iterate resume.awards
;(function(){
  var $$obj = resume.awards;
  if ('number' == typeof $$obj.length) {
      for (var pug_index15 = 0, $$l = $$obj.length; pug_index15 < $$l; pug_index15++) {
        var award = $$obj[pug_index15];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"award\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.title + " ") ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.awarder) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "Awarded on: ";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (null == (pug_interp = award.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index15 in $$obj) {
      $$l++;
      var award = $$obj[pug_index15];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\" itemprop=\"award\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.title + " ") ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + ",&nbsp;";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.awarder) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "Awarded on: ";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = award.date) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fawards.pug";
pug_html = pug_html + (null == (pug_interp = award.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (!(_.isEmpty(resume.volunteer))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"volunteer-work\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-child\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "Volunteer Work\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "Volunteer Work\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
// iterate resume.volunteer
;(function(){
  var $$obj = resume.volunteer;
  if ('number' == typeof $$obj.length) {
      for (var pug_index16 = 0, $$l = $$obj.length; pug_index16 < $$l; pug_index16++) {
        var volunteer_info = $$obj[pug_index16];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (!volunteer_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Volunteering\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.position + ', ') ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (volunteer_info.website) {
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", volunteer_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = volunteer_info.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (!(_.isEmpty(volunteer_info.highlights))) {
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
// iterate volunteer_info.highlights
;(function(){
  var $$obj = volunteer_info.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index17 = 0, $$l = $$obj.length; pug_index17 < $$l; pug_index17++) {
        var highlight = $$obj[pug_index17];
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index17 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index17];
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index16 in $$obj) {
      $$l++;
      var volunteer_info = $$obj[pug_index16];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin relative\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (!volunteer_info.endDate) {
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Ci class=\"icon-circle current-event\" rel=\"tooltip\" title=\"Currently Volunteering\" data-placement=\"left\"\u003E\u003C\u002Fi\u003E";
}
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.position + ', ') ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (volunteer_info.website) {
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", volunteer_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.organization) ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fp\u003E";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.startDate) ? "" : pug_interp));
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + " - ";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = volunteer_info.endDate || 'Present') ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = volunteer_info.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
if (!(_.isEmpty(volunteer_info.highlights))) {
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cul\u003E";
;pug_debug_line = 37;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
// iterate volunteer_info.highlights
;(function(){
  var $$obj = volunteer_info.highlights;
  if ('number' == typeof $$obj.length) {
      for (var pug_index18 = 0, $$l = $$obj.length; pug_index18 < $$l; pug_index18++) {
        var highlight = $$obj[pug_index18];
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index18 in $$obj) {
      $$l++;
      var highlight = $$obj[pug_index18];
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + "\u003Cli class=\"mop-wrapper\"\u003E";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fbackground\u002Fvolunteer-work.pug";
pug_html = pug_html + (null == (pug_interp = highlight) ? "" : pug_interp) + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
if (!(_.isEmpty(resume.publications))) {
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"publications\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-newspaper\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "Publications\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "Publications\u003C\u002Fh4\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
// iterate resume.publications
;(function(){
  var $$obj = resume.publications;
  if ('number' == typeof $$obj.length) {
      for (var pug_index19 = 0, $$l = $$obj.length; pug_index19 < $$l; pug_index19++) {
        var publication = $$obj[pug_index19];
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
if (publication.url) {
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", publication.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "&nbsp;,&nbsp;";
}
else {
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.publisher) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Published on: ' + publication.releaseDate) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (null == (pug_interp = publication.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index19 in $$obj) {
      $$l++;
      var publication = $$obj[pug_index19];
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cp class=\"clear-margin\"\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
if (publication.url) {
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", publication.url, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "&nbsp;,&nbsp;";
}
else {
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.name + ', ') ? "" : pug_interp));
}
pug_html = pug_html + "\u003C\u002Fstrong\u003E";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = publication.publisher) ? "" : pug_interp)) + "\u003C\u002Fp\u003E";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cp class=\"text-muted\"\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Csmall\u003E";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = 'Published on: ' + publication.releaseDate) ? "" : pug_interp)) + "\u003C\u002Fsmall\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fbackground\u002Fpublications.pug";
pug_html = pug_html + (null == (pug_interp = publication.summary) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
if (!(_.isEmpty(resume.interests))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"interests\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-heart\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "Interests\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "Interests\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
// iterate resume.interests
;(function(){
  var $$obj = resume.interests;
  if ('number' == typeof $$obj.length) {
      for (var pug_index20 = 0, $$l = $$obj.length; pug_index20 < $$l; pug_index20++) {
        var interest = $$obj[pug_index20];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = interest.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
if (!(_.isEmpty(interest.keywords))) {
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
// iterate interest.keywords
;(function(){
  var $$obj = interest.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index21 = 0, $$l = $$obj.length; pug_index21 < $$l; pug_index21++) {
        var keyword = $$obj[pug_index21];
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index21 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index21];
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index20 in $$obj) {
      $$l++;
      var interest = $$obj[pug_index20];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cp\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cstrong\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = interest.name) ? "" : pug_interp)) + "\u003C\u002Fstrong\u003E\u003C\u002Fp\u003E";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
if (!(_.isEmpty(interest.keywords))) {
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cdiv class=\"space-top labels\"\u003E";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
// iterate interest.keywords
;(function(){
  var $$obj = interest.keywords;
  if ('number' == typeof $$obj.length) {
      for (var pug_index22 = 0, $$l = $$obj.length; pug_index22 < $$l; pug_index22++) {
        var keyword = $$obj[pug_index22];
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index22 in $$obj) {
      $$l++;
      var keyword = $$obj[pug_index22];
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + "\u003Cspan class=\"label label-keyword\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Finterests.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = keyword) ? "" : pug_interp)) + "\u003C\u002Fspan\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
if (!(_.isEmpty(resume.references))) {
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cdiv class=\"detail\" id=\"references\"\u003E";
;pug_debug_line = 3;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cdiv class=\"icon\"\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Ci class=\"fs-lg icon-thumbs-up\"\u003E\u003C\u002Fi\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cspan class=\"mobile-title\"\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "References\u003C\u002Fspan\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cdiv class=\"info\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Ch4 class=\"title text-uppercase\"\u003E";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "References\u003C\u002Fh4\u003E";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cdiv class=\"content\"\u003E";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cul class=\"list-unstyled clear-margin\"\u003E";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
// iterate resume.references
;(function(){
  var $$obj = resume.references;
  if ('number' == typeof $$obj.length) {
      for (var pug_index23 = 0, $$l = $$obj.length; pug_index23 < $$l; pug_index23++) {
        var reference_info = $$obj[pug_index23];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
if (reference_info.website) {
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", reference_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp));
}
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cblockquote class=\"quote\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + (null == (pug_interp = reference_info.reference) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fblockquote\u003E\u003C\u002Fli\u003E";
      }
  } else {
    var $$l = 0;
    for (var pug_index23 in $$obj) {
      $$l++;
      var reference_info = $$obj[pug_index23];
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cli class=\"card card-nested\"\u003E";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
if (reference_info.website) {
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Ca" + (pug_attr("href", reference_info.website, true, false)+" target=\"_blank\"") + "\u003E";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp)) + "\u003C\u002Fa\u003E";
}
else {
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + (pug_escape(null == (pug_interp = reference_info.name) ? "" : pug_interp));
}
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cblockquote class=\"quote\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + "\u003Cdiv class=\"mop-wrapper\"\u003E";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fbackground\u002Freferences.pug";
pug_html = pug_html + (null == (pug_interp = reference_info.reference) ? "" : pug_interp) + "\u003C\u002Fdiv\u003E\u003C\u002Fblockquote\u003E\u003C\u002Fli\u003E";
    }
  }
}).call(this);

pug_html = pug_html + "\u003C\u002Ful\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
}
pug_html = pug_html + "\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E\u003C\u002Fsection\u003E\u003C\u002Fdiv\u003E\u003C\u002Fdiv\u003E";
;pug_debug_line = 1;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fjquery\u002F1.11.0\u002Fjquery.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 2;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\u003Cscript src=\"https:\u002F\u002Fcdnjs.cloudflare.com\u002Fajax\u002Flibs\u002Ftwitter-bootstrap\u002F3.3.6\u002Fjs\u002Fbootstrap.min.js\"\u003E\u003C\u002Fscript\u003E";
;pug_debug_line = 4;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 5;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "$(function () {";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 6;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  var toggleFloatingMenu = function() {";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 7;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    $( '.js-floating-nav' ).toggleClass( 'is-visible' );";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 8;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    $( '.js-floating-nav-trigger' ).toggleClass( 'is-open' );";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 9;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  };";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 10;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 11;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  $( \".background-card\" ).css( \"min-height\", window.screen.availHeight + \"px\" );";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 12;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  $( \"[data-toggle=tooltip]\" ).tooltip();";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 13;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  $( '.js-floating-nav-trigger' ).on( 'click', function(e) {";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 14;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    e.preventDefault();";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 15;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    toggleFloatingMenu();";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 16;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  });";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 17;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  $( '.js-floating-nav a' ).on( 'click', toggleFloatingMenu );";
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 18;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 19;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  $(\"#remaining-profiles\").on('show.bs.collapse', function() {";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 20;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    $( '.js-profiles-collapse \u003E i' )";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 21;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "      .removeClass( 'icon-chevron-down' )";
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 22;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "      .addClass( 'icon-chevron-up' );";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 23;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  });";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 24;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 25;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  $(\"#remaining-profiles\").on('hidden.bs.collapse', function() {";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 26;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    $( '.js-profiles-collapse \u003E i' )";
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 27;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "      .removeClass( 'icon-chevron-up' )";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 28;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "      .addClass( 'icon-chevron-down' );";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 29;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  });";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 30;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "});";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 31;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\u003C\u002Fscript\u003E";
;pug_debug_line = 32;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\u003Cscript\u003E";
;pug_debug_line = 33;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "WebFontConfig = {";
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 34;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  google: { families: [ 'Lato:300,400,700:latin' ] }";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 35;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "};";
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 36;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "(function() {";
;pug_debug_line = 37;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 37;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  var wf = document.createElement('script');";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 38;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +";
;pug_debug_line = 39;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 39;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "    ':\u002F\u002Fajax.googleapis.com\u002Fajax\u002Flibs\u002Fwebfont\u002F1\u002Fwebfont.js';";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 40;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  wf.type = 'text\u002Fjavascript';";
;pug_debug_line = 41;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 41;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  wf.async = 'true';";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 42;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  var s = document.getElementsByTagName('script')[0];";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 43;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "  s.parentNode.insertBefore(wf, s);";
;pug_debug_line = 44;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "\n";
;pug_debug_line = 44;pug_debug_filename = "pug\u002Fscripts.pug";
pug_html = pug_html + "})();\u003C\u002Fscript\u003E\u003C\u002Fbody\u003E\u003C\u002Fhtml\u003E";}.call(this,"_" in locals_for_with?locals_for_with._:typeof _!=="undefined"?_:undefined,"css" in locals_for_with?locals_for_with.css:typeof css!=="undefined"?css:undefined,"floating_nav_items" in locals_for_with?locals_for_with.floating_nav_items:typeof floating_nav_items!=="undefined"?floating_nav_items:undefined,"resume" in locals_for_with?locals_for_with.resume:typeof resume!=="undefined"?resume:undefined));} catch (err) {pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);};return pug_html;}module.exports = { renderResume: template };
