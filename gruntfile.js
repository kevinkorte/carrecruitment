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
        src: 'dev/js/*.js',
        dest: 'js/scripts.min.js'
      },
      build: {
        src: 'dev/js/*.js',
        dest: 'js/scripts.min.js'
      }
    },

    sass: {
      dev: {
        options: {
          outputStyle: 'expanded'
        },
        files: {
          'style.css' : 'dev/scss/style.scss'
        }
      },
      build: {
        options: {
          outputStyle: 'compressed'
        },
        files: {
          'style.css' : 'dev/scss/style.scss'
        }
      }
    },

    watch: {
      js: {
        files: ['dev/js/*.js'],
        tasks: ['uglify:dev']
      },
      css: {
        files: ['dev/scss/**/*.scss'],
        tasks: ['sass:dev']
      }
    },

    postcss: {
        options: {
            map: true,
            processors: [
                require('autoprefixer')({browsers: 'last 2 versions'}) // add vendor prefixes
            ]
        },
        dev: {
            src: 'style.css'
        },
        build: {
            src: 'style.css'
        }
    }

  });

  // Load grunt plugins
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-sass');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-postcss');

  // Register task(s)
  grunt.registerTask('default', ['uglify:dev','sass:dev','postcss:dev']);
  grunt.registerTask('build', ['uglify:build','sass:build','postcss:build']);

}
