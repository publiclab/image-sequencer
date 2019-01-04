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
        files: ["src/**/*", "Gruntfile.js"],
        tasks: ["build:js"]
      }
    },

    watch: {
      options: {
        livereload: true
      },
      ui: {
        files: ["examples/lib/*", "Gruntfile.js"],
        tasks: ["build:js"]
      }
    }

    browserify: {
      dist: {
        src: ["src/ImageSequencer.js"],
        dest: "dist/image-sequencer.js"
      }
    },

    uglify: {
      dist: {
        src: ["./dist/image-sequencer.js"],
        dest: "./dist/image-sequencer.min.js"
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
  grunt.registerTask("build", ["browserify:dist", "uglify:dist"]);
  grunt.registerTask("serve", ["browserify:dist", "uglify:dist", "browserSync", "watch"]);
};
