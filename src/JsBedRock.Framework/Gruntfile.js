module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  
  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: ';',
        sourceMap: true
      },
      dist: {
        src: pkg.sourceFiles,
        dest: 'obj/' + pkg.name + '.js'
      },
      testsDist: {
        src: ['tests/**/*.js'],
        dest: 'obj/' + pkg.name + '.tests.js'
      }
    },
    uglify: {
      options: {
        sourceMap: true,
        sourceMapIncludeSources: true
      },
      build: {
        src: 'obj/' + pkg.name + '.js',
        dest: '../../bin/' + pkg.name + '.min.js'
      },
      testsBuild: {
        src: 'obj/' + pkg.name + '.tests.js',
        dest: 'bin/' + pkg.name + '.tests.min.js'
      }
    },
    "html-generator": {
      options: {
        root: ".",
        output: 'bin/' + pkg.name + '.html',
        minify: true,
        meta:[{
          charset: "utf-8"
        }]
      },
      target: {
        files: {
          js: [
            '../../../bin/' + pkg.name + '.min.js',
            '../../../node_modules/qunitjs/qunit/qunit.js',
            pkg.name + '.tests.min.js'
          ],
          css : "../../../node_modules/qunitjs/qunit/qunit.css",
          title : pkg.name,
          head  : ["../../assets/testing/header.html"],
          body  : ["../../assets/testing/body.html"]
        },
      },
    },
    qunit: {
      all: ['bin/' + pkg.name + '.html']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html-generator');
  grunt.loadNpmTasks('grunt-contrib-qunit');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify', 'html-generator', 'qunit']);
};