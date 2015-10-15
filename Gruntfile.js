module.exports = function(grunt) {
  var pkg = grunt.file.readJSON('package.json');
  var runGruntConfig = {};
  for(var i = 0; i < pkg.childProjects.length; i++)
    runGruntConfig[pkg.childProjects[i]] = "src/" + pkg.childProjects[i] + "/Gruntfile.js";
  
  // Project configuration.
  grunt.initConfig({
    auto_install: {
      local: {},
      subdir: {
        options: {
          stdout: true,
          stderr: true,
          recursive: true,
          failOnError: true,
          npm: true,
          match: "JsBedRock.*"
        }
      }
    },
    run_grunt: runGruntConfig,
    watch: {
      scripts: {
        files: ['src/**/*.js'],
        tasks: ['auto_install', 'run_grunt']
      }
    }
  });

  grunt.loadNpmTasks('grunt-auto-install');
  grunt.loadNpmTasks('grunt-run-grunt');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('default', ['auto_install', 'run_grunt']);
};