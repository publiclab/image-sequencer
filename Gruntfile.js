module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-browser-sync');

  require('matchdep')
    .filterDev('grunt-*')
    .forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    watch: {
      options: {
        livereload: true
      },
      source: {
        files: ['src/**/*', 'Gruntfile.js', 'examples/lib/*', 'examples/demo.js'],
        tasks: ['compile']
      }
    },

    browserify: {
      core: {
        src: ['src/ImageSequencer.js'],
        dest: 'dist/image-sequencer.js'
      },
      ui: {
        src: ['examples/demo.js'],
        dest: 'dist/image-sequencer-ui.js'
      },
      prodcore: {
        src: ['src/ImageSequencer.js'],
        dest: 'dist/image-sequencer.brow.js'
      },
      produi: {
        src: ['examples/demo.js'],
        dest: 'dist/image-sequencer-ui.brow.js'
      }
    },

    uglify: {
      core: {
        src: ['./dist/image-sequencer.js'],
        dest: './dist/image-sequencer.min.js'
      },
      ui: {
        src: ['dist/image-sequencer-ui.js'],
        dest: 'dist/image-sequencer-ui.min.js'
      },
      prodcore: {
        src: ['dist/image-sequencer.brow.js'],
        dest: 'dist/image-sequencer.js'
      },
      produi: {
        src: ['dist/image-sequencer-ui.brow.js'],
        dest: 'dist/image-sequencer-ui.js'
      }
    },
    browserSync: {
      dev: {
        options: {
          watchTask: true,
          server: './'
        }
      }
    }
  });

  /* Default (development): Watch files and build on change. */
  grunt.registerTask('default', ['watch']);
  grunt.registerTask('build', ['browserify:core', 'browserify:ui', 'uglify:core', 'uglify:ui']);
  grunt.registerTask('serve', ['browserify:core', 'browserify:ui', 'browserSync', 'watch']);
  grunt.registerTask('compile', ['browserify:core', 'browserify:ui']);
  grunt.registerTask('production', ['browserify:prodcore', 'browserify:produi', 'uglify:prodcore', 'uglify:produi']);
};
