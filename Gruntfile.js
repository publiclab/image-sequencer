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

      new: {
        files: ["examples/new/lib/**/*.js", "examples/new/demo.js", "Gruntfile.js"],
        tasks: ["browserify:new"]
      },

      old: {
        files: ["examples/legacy/lib/*.js", "examples/legacy/demo.js", "Gruntfile.js"],
        tasks: ["browserify:old"]
      },

      dist: {
        files: ["src/**/*", "Gruntfile.js"],
        tasks: ["browserify:dist"]
      }
    },

    browserify: {
      dist: {
        src: ["src/ImageSequencer.js"],
        dest: "dist/image-sequencer.js"
      }, 
      new: {
        src: ["examples/new/demo.js"],
        dest: "dist/ui/new/image-sequencer-ui.js"
      },
      old: {
        src: ["examples/legacy/demo.js"],
        dest: "dist/ui/legacy/image-sequencer-ui.js"
      }
    },

    uglify: {
      dist: {
        src: ["./dist/image-sequencer.js"],
        dest: "./dist/image-sequencer.min.js"
      },
      new: {
        src: ["examples/new/demo.js"],
        dest: "dist/ui/new/image-sequencer-ui.min.js"
      },
      old: {
        src: ["examples/legacy/demo.js"],
        dest: "dist/ui/legacy/image-sequencer-ui.min.js"
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
  grunt.registerTask("compile", ["browserify"])
  grunt.registerTask("build", ["browserify", "uglify"]);
  grunt.registerTask("serve", ["browserify", "uglify", "browserSync", "watch"]);
};
