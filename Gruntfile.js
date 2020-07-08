module.exports = function(grunt) {
  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-contrib-uglify-es');
  grunt.loadNpmTasks('grunt-browser-sync');
  grunt.loadNpmTasks('grunt-text-replace');

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
      options: {
        alias: {
          'gpu.js': './node_modules/gpu.js/src/index.js'
        }
      },
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
      },
      tests: {
        src: ['test/core/sequencer/meta-modules.js',
              'test/core/sequencer/image-sequencer.js',
              'test/core/sequencer/chain.js',
              'test/core/sequencer/replace.js',
              'test/core/sequencer/import-export.js',
              'test/core/sequencer/run.js',
              'test/core/sequencer/dynamic-imports.js',
              'test/core/util/*.js'],
        dest: './output/core-tests.js'
      }
    },

    replace: {
      version: {
        src: ['examples/sw.js'],
        overwrite: true,
        replacements: [{
          from: /image-sequencer-static-v.*/g,
          to: "image-sequencer-static-v<%= pkg.version %>';"
        }]
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
  grunt.registerTask('build', ['browserify:core', 'browserify:ui', 'replace:version', 'uglify:core', 'uglify:ui']);
  grunt.registerTask('serve', ['browserify:core', 'browserify:ui', 'replace:version', 'browserSync', 'watch']);
  grunt.registerTask('compile', ['browserify:core', 'browserify:ui']);
  grunt.registerTask('production', ['browserify:prodcore', 'browserify:produi', 'replace:version', 'uglify:prodcore', 'uglify:produi']);

  grunt.registerTask('tests', ['browserify:tests']);
};
