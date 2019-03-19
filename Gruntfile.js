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
        files: ["src/**/*", "Gruntfile.js", "examples/lib/*","examples/demo.js"],
        tasks: ["browserify"]
      }
    },

    browserify: {
      core: {
        src: ["src/ImageSequencer.js"],
        dest: "dist/image-sequencer.js"
      }, 
      ui: {
        src: ["examples/demo.js"],
        dest: "dist/image-sequencer-ui.js"
      }
    },

    uglify: {
      core: {
        src: ["./dist/image-sequencer.js"],
        dest: "./dist/image-sequencer.min.js"
      },
      ui: {
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
  grunt.registerTask("build", ["browserify", "uglify"]);
  grunt.registerTask("serve", ["browserify", "browserSync", "watch"]);
  grunt.registerTask("compile", ["browserify"]);
};
