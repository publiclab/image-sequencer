module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-browser-sync");

  require("matchdep")
    .filterDev("grunt-*")
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ["src/**/*", "examples/lib/**/*.js", "examples/demo.js", "Gruntfile.js"],
        tasks: ["compile:js"]
      }
    },

    browserify: {
      dist: {
        src: ["src/ImageSequencer.js"],
        dest: "dist/image-sequencer.js"
      }, 
      js: {
        src: ["examples/demo.js"],
        dest: "dist/image-sequencer-ui.js"
      }
    },

    uglify: {
      dist: {
        src: ["./dist/image-sequencer.js"],
        dest: "./dist/image-sequencer.min.js"
      },
      js: {
        src: ['dist/image-sequencer-ui.js'],
        dest: 'dist/image-sequencer-ui.min.js'
      }
    },
    browserSync: {
      dev: {
        options: {
          watchTask: true,
          server: "./"
        }
      }
    }
  });

  /* Default (development): Watch files and build on change. */
  grunt.registerTask("default", ["watch"]);
  grunt.registerTask("compile", ["browserify:dist", "browserify:js"])
  grunt.registerTask("build", ["browserify:dist", "uglify:dist", "browserify:js", "uglify:js"]);
  grunt.registerTask("serve", ["browserify:dist","browserify:js","uglify:dist","uglify:js","browserSync", "watch"]);
};
