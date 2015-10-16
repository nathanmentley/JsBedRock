module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  
  // Project configuration.
  grunt.initConfig({
    concat: {
      options: {
        separator: grunt.util.linefeed + ';' + grunt.util.linefeed,
        sourceMap: true
      },
      dist: {
        src: pkg.sourceFiles,
        dest: 'obj/' + pkg.name + '.js'
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
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);
};