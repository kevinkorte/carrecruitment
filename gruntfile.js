module.exports = function(grunt) {

  // Configure task(s)
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    uglify: {
      dev: {
        options: {
          beautify: true,
          mangle: false,
          compress: false,
          preserveComments: 'all'
        },
        src: 'js/*.js',
        dest: 'js/scripts.min.js'
      },
      build: {
        src: 'js/*.js',
        dest: 'js/scripts.min.js'
      }
    },

    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'style.css' : 'scss/style.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'style.css' : 'scss/style.scss'
        }
      }
    },

    watch: {
      js: {
        files: ['js/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    }

  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Register task(s)
  grunt.registerTask('default', ['uglify:dev','sass:dev']);
  grunt.registerTask('build', ['uglify:build','sass:build']);

}
