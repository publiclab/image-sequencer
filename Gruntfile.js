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

      uiUtils: {
        files: ["ui/**/*.js", "Gruntfile.js"],
        tasks: ["browserify:ui"]
      },

      src: {
        files: ["src/**/*", "Gruntfile.js"],
        tasks: ["browserify:dist"]
      },

      renderers: {
        files: ["examples/renderers/**/*.js"],
        tasks: ["browserify:rendererMaterialize", "browserify:rendererBootstrap"]
      }
    },

    browserify: {
      dist: {
        src: ["src/ImageSequencer.js"],
        dest: "dist/image-sequencer.js"
      }, 

      ui: {
        src: ["ui/index.js"],
        dest: "dist/ui/image-sequencer-ui-utils.js"
      },

      rendererMaterialize: {
        src: ["examples/renderers/materialize/index.js"],
        dest: "examples/renderers/materialize/dist/renderer.js"
      },

      rendererBootstrap: {
        src: ["examples/renderers/bootstrap/index.js"],
        dest: "examples/renderers/bootstrap/dist/renderer.js"
      }
    },

    uglify: {
      dist: {
        src: ["./dist/image-sequencer.js"],
        dest: "./dist/image-sequencer.min.js"
      },

      ui: {
        src: ["./dist/ui/image-sequencer-ui-utils.js"],
        dest: "dist/ui/image-sequencer-ui-utils.min.js"
      },

      rendererMaterialize: {
        src: ["examples/renderers/materialize/dist/renderer.js"],
        dest: "examples/renderers/materialize/dist/renderer.min.js"
      },

      rendererBootstrap: {
        src: ["examples/renderers/bootstrap/dist/renderer.js"],
        dest: "examples/renderers/bootstrap/dist/renderer.min.js"
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
  grunt.registerTask("compile", ["browserify"]);
  grunt.registerTask("build", ["browserify", "uglify"]);
  grunt.registerTask("serve", ["browserify", "uglify", "browserSync", "watch"]);
};
