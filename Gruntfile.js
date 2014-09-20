module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            compile: {
                src: './assets/less/theme.less',
                dest: './assets/css/theme.css'
            }
        },
        watch: {
            styles: {
                files: ['assets/less/**/*.less'],
                tasks: ['less'],
                options: {
                    nospawn: true
                }
            }
        },
        exec: {
            run_server: {
                cmd: "node serve.js"
            }
        }
    });

    // Load the plugin that compiles less to css
    grunt.loadNpmTasks('grunt-contrib-less');

    // Load the plugin that watches file changes
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Load the plugin to execute shell commands
    grunt.loadNpmTasks('grunt-exec');

    // Default tasks
    grunt.registerTask('default', ['exec']);
}