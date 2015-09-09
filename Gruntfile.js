module.exports = function (grunt) {

    grunt.initConfig({
        srcFolder: 'frontend/src/',
        vendorFolder: 'frontend/vendor/',
        distFolder: 'frontend/dist/',
        clean: {
            dist: {
                src: ['<%= distFolder %>/*']
            }
        },
        bower: {
            install: {
                options: {
                    targetDir: '<%= vendorFolder %>',
                    cleanBowerDir: true,
                    cleanTargetDir: true
                }
            }
        },
        watch: {
            templates: {
                files: ['<%= srcFolder %>/**/*.html'],
                tasks: ['html2js', 'generateJs'],
                options: {
                    spawn: false
                }
            },
            less: {
                files: ['<%= srcFolder %>/**/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['<%= srcFolder %>/**/*.js', '<%= vendorFolder %>/**/*.js', '!<%= srcFolder %>/**/*Spec.js'],
                tasks: ['generateJs'],
                options: {
                    spawn: false
                }
            },
            symlink: {
                files: ['../nowtv-web-nemo/dist/nemo.js'],
                tasks: ['symlink'],
                options: {
                    spawn: false
                }
            }
        },
        less: {
            prod: {
                files: {
                    "<%= distFolder %>css.css": "<%= srcFolder %>loader.less"
                }
            }
        },
        concat: {
            dist: {
                files: {
                    '<%= distFolder %>js.min.js': [
                        '<%= vendorFolder %>/jquery/jquery.js',
                        '<%= vendorFolder %>/angular/angular.js',
                        '<%= vendorFolder %>/angular-ui-router/angular-ui-router.js',
                        '<%= vendorFolder %>/less/less.js',
                        '<%= vendorFolder %>/nemo/nemo.js',
                        '<%= vendorFolder %>/fullScreenMario/Dist/FullScreenMario.min.js',
                        '<%= vendorFolder %>d3/d3.js',
                        '<%= vendorFolder %>/n3-line-chart/line-chart.min.js',
                        '<%= srcFolder %>/app.js',
                        '<%= srcFolder %>/**/*.js',
                        '!<%= srcFolder %>/**/*Spec.js'
                    ]
                }
            }
        },
        uglify: {
            options: {
                mangle: false, //reduce names of local variables to (usually) single-letters.
                report: 'min',
                banner: ''
            },
            dist: {
                files: {
                    '<%= distFolder %>js.min.js': ['<%= distFolder %>js.min.js']
                }
            }
        },
        html2js: {
            options: {
                rename: function (moduleName) {
                    return moduleName.substring(moduleName.lastIndexOf('/') + 1);
                }
            },
            main: {
                src: ['<%= srcFolder %>/**/*.html'],
                dest: '<%= srcFolder %>/common/templates.js'
            }
        },
        shell: {
            startNode: {
                command: '"node_modules//.bin//supervisor" backend//server.js',
                options: {stdout: true}
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            setupDevEnv: {
                tasks: ['watch:templates', 'watch:less', 'watch:js', 'shell:startNode']
            },
            setupDevEnvNemoSymlink: {
                tasks: ['watch:templates', 'watch:less', 'watch:js', 'watch:symlink', 'shell:startNode']
            }
        },
        symlink: {
            options: {
                overwrite: true
            },
            explicit: {
                src: '../nowtv-web-nemo/dist/nemo.js',
                dest: '<%= vendorFolder %>/nemo/nemo.js'
            }
        },
        karma: {
            unit: {
                options: {
                    frameworks: ['jasmine'],
                    singleRun: false,
                    browsers: ['PhantomJS'],
                    reporters: 'dots',
                    files: [
                        'frontend/vendor/angular/angular.js',
                        'frontend/vendor/angular-mocks/angular-mocks.js',
                        'frontend/vendor/angular-ui-router/angular-ui-router.js',
                        'frontend/vendor/sinon/index.js',
                        'frontend/vendor/jasmine-sinon/jasmine-sinon.js',
                        'frontend/vendor/nemo/nemo.js',
                        'frontend/vendor/n3-line-chart/line-chart.min.js',
                        'frontend/vendor/fullScreenMario/Source/Wrappers/angularWrapper.js',
                        'frontend/helpers/**/*.js',
                        'frontend/src/**/*.js'
                    ]
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-symlink');
    grunt.loadNpmTasks('grunt-karma');

    grunt.registerTask('generateJs', ['concat']);
    grunt.registerTask('setupDependencies', ['bower']);
    grunt.registerTask('setupDevEnv', ['generateJs', 'concurrent:setupDevEnv']);
    grunt.registerTask('setupDevEnvNemoSymlink', ['generateJs', 'concurrent:setupDevEnvNemoSymlink']);
    grunt.registerTask('runUnitTests', ['karma']);
};