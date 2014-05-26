module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        copy: {
            main: {
                files: [
                    {expand: true, cwd: '<%= pkg.sourcePath %>/', src: ['**'], dest: '<%= pkg.buildPath %>/'}
                ]
            }
        },
        "mozilla-addon-sdk": {
            stable: {
                options: {
                    revision: "1.16"
                }
            }
        },
        "mozilla-cfx-xpi": {
            stable: {
                options: {
                    "mozilla-addon-sdk": "stable",
                    extension_dir: "<%= pkg.buildPath %>",
                    dist_dir: "<%= pkg.buildPath %>"
                }
            }
        },
        "mozilla-cfx": {
            custom_command: {
                options: {
                    "mozilla-addon-sdk": "stable",
                    extension_dir: "<%= pkg.buildPath %>",
                    command: "run",
                    arguments: "-p developer_profile"
                }
            }
        },
        clean: {
            build: {
                files: [
                    {expand: true, cwd: "<%= pkg.buildPath %>", src: ["*", "!*.xpi", "!*developer_profile"]}
                ]
            }
        }
    });

    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks('grunt-mozilla-addon-sdk');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask("build", ["copy", "mozilla-addon-sdk", "mozilla-cfx-xpi", "clean"]);
    grunt.registerTask("default", ["copy", "mozilla-addon-sdk", "mozilla-cfx"]);
};