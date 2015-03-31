module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
     compass: {                  // Task
        dev: {                   // Target
        options: {
            config: 'config.rb',
            }
            },
          },

    watch: {
      options: {
        //livereload: true
      },
      sass: {
        files: ['scss/{,**/}*.{scss,sass}'],
        tasks: ['compass:dev'],
        options: {
          livereload: false
        }
      },
      registry: {
        files: ['*.info', '{,**}/*.{php,inc}'],
        tasks: ['shell'],
        options: {
          livereload: false
        }
      },
      images: {
        files: ['images/**']
      },
      css: {
        files: ['css/{,**/}*.css'],
        tasks: ['autoprefixer']
      },
      js: {
        files: ['javascripts/{,**/}*.js', '!javascripts/{,**/}*.min.js'],
        tasks: ['jshint', 'uglify:dev']
      }
    },

        uglify: {
      dev: {
        options: {
          mangle: false,
          compress: false,
          beautify: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'javascripts',
          dest: 'javascripts',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      },
      dist: {
        options: {
          mangle: true,
          compress: true
        },
        files: [{
          expand: true,
          flatten: true,
          cwd: 'javascripts',
          dest: 'javascripts',
          src: ['**/*.js', '!**/*.min.js'],
          rename: function(dest, src) {
            var folder = src.substring(0, src.lastIndexOf('/'));
            var filename = src.substring(src.lastIndexOf('/'), src.length);
            filename = filename.substring(0, filename.lastIndexOf('.'));
            return dest + '/' + folder + filename + '.min.js';
          }
        }]
      }
    },
    autoprefixer: {
        options: {
          browsers: ['last 4 versions']
        },
        single_file: {
          options: {
        // Target-specific options go here.
          },
        src: 'css/style.css',
        dest: 'css/style.css'
      },
    }
  });

  // Default task(s).
  grunt.registerTask('default', ['compass']);
  grunt.registerTask('viewer', ['watch']);
  grunt.registerTask('prefix', ['autoprefixer']);

};

