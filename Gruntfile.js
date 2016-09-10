module.exports = function(grunt){

	grunt.initConfig({
        // Cleans directory
        clean: ['coverage/'],

        // Automatically includes bower dependencies on index.html
        wiredep: {
            task: {
                src: 'index.html'
            },
        },

        // Automatically detects bower_component updates and executes wiredep task
        watch: {
            js: {
                files: ['app/*', 'app/**/*', 'app/**/**/*'],
                tasks: ['jshint']
            }
        },

        // Automatically detects JS errors
        jshint: {
            all: ['Gruntfile.js', 'app/**/**/*.js', 'app/**/*.js', 'app/*.js']
        },
    
        // Mocks a server on custom port
        connect: {
            dev: {
                options: {
                    port: 9000,
                    base: '.',
                    open: true
                }
            },
            coverage:{
                options: {
                    port: 9001,
                    base: 'coverage/report/',
                    open: true,
                    keepalive: true
                }
            }
        },

        // Task for including yeoman generations
        includeSource: {
            options: {
                basePath: '',
                baseUrl: '',
                templates: {
                    html: {
                        js: '<script src="{filePath}"></script>',
                        css: '<link rel="stylesheet" type="text/css" href="{filePath}" />'
                    }
                }
            },
            myTarget: {
                files: {
                    'index.html': 'index.html'
                }
            }
        },

        // Task for launching karma pointing config file for execute the Unit Tests (Jasmine)
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },


    });

    // Tasks loading
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-wiredep');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-include-source');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect');


    // Task for watching JS errors during development (Errors detected will be outputed on console)
    grunt.registerTask('jslinter', ['watch:js']);

    // $ grunt depcompile (Wire all deps)
    grunt.registerTask('depcompile', [
        'wiredep', 'includeSource'
    ]);

    // Unit Testing related task
    grunt.registerTask('test:unit', ['karma']);
    grunt.registerTask('test:coverage', ['clean', 'karma', 'connect:coverage']);

    // Developer related tasks
    // ===============================================================================================

    // $ grunt server (Launches development server)
    grunt.registerTask('server', [
        'depcompile', 'connect:dev', 'jslinter'
    ]);

};