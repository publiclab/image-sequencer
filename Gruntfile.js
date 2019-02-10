module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-browserify");
  grunt.loadNpmTasks("grunt-contrib-uglify-es");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks('grunt-css-import');

  require("matchdep")
    .filterDev("grunt-*")
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON("package.json"),

    watch: {
      options: {
        livereload: true
      },

      src: {
        files: ["src/**/*", "Gruntfile.js"],
        tasks: ["browserify:dist"]
      },

      renderers: {
        files: ["examples/renderers/**/js/*"],
        tasks: ["browserify:rendererMaterialize", "browserify:rendererBootstrap"]
      },

      rendererCSS: {
        files: ["examples/renderers/**/css/*"],
        tasks: ["css_import"]
      }
    },

    browserify: {
      dist: {
        src: ["src/ImageSequencer.js"],
        dest: "dist/image-sequencer.js"
      }, 

      rendererMaterialize: {
        src: ["examples/renderers/materialize/js/index.js"],
        dest: "examples/renderers/materialize/dist/renderer.js"
      },

      rendererBootstrap: {
        src: ["examples/renderers/bootstrap/js/index.js"],
        dest: "examples/renderers/bootstrap/dist/renderer.js"
      }
    },

    css_import: {
      rendererMaterialize: {
        options: {},

        files: {
          'examples/renderers/materialize/dist/renderer.css': ["examples/renderers/materialize/css/*.css"]
        }
      }
    },

    uglify: {
      dist: {
        src: ["./dist/image-sequencer.js"],
        dest: "./dist/image-sequencer.min.js"
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
  grunt.registerTask("compile", ["browserify", "css_import"]);
  grunt.registerTask("build", ["browserify", "uglify", "css_import"]);
  grunt.registerTask("serve", ["browserify", "uglify", "css_import", "browserSync", "watch"]);
};
