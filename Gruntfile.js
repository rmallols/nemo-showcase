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
                files: ['<%= srcFolder %>/**/*.js', '<%= vendorFolder %>/**/*.js'],
                tasks: ['generateJs'],
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
                        '<%= vendorFolder %>/angular/angular.js',
                        '<%= vendorFolder %>/**/*.js',
                        '<%= srcFolder %>/app.js',
                        '<%= srcFolder %>/**/*.js'
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
            startNode: { command: 'node backend/server.js', options: { stdout: true } }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            setupDevEnv: {
                tasks: ['watch', 'shell:startNode']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-bower-task');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('generateJs', ['concat', 'uglify']);
    grunt.registerTask('setupDevEnv', ['concurrent']);
};