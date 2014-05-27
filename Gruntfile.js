/*global module:false*/
module.exports = function(grunt) {

  // Load Grunt tasks declared in the package.json file
  //require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

  // Default task.
  //grunt.registerTask('default', ['mkdir', 'clean', 'copy', 'html2js', 'jshint', 'concat', 'uglify']); //'qunit',

  grunt.registerTask('default', ['jshint','build']); //,'karma:unit'

  grunt.registerTask('build', ['mkdir', 'clean', 'bower', 'copy', 'html2js', 'concat', 'ngAnnotate']);
  grunt.registerTask('release', ['build','uglify','jshint']);

  grunt.registerTask('server', ['express', 'open', 'watch']);

  //grunt.registerTask('test-watch', ['karma:watch']);


  // Project configuration.
  grunt.initConfig({

    // --- Metadata.
    distdir: 'dist',
    dist: {
      dir: 'dist',
      lib: '<%= dist.dir %>/lib',
      html: '<%= dist.dir %>/index.html',
      app: '<%= dist.dir%>/app.js'
    },
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    src: {
      js: ['src/**/*.js'],
      //jsTpl: ['<%= distdir %>/templates/**/*.js'],
      //specs: ['test/**/*.spec.js'],
      //scenarios: ['test/**/*.scenario.js'],
      html: ['src/index.html'],
      tpl: {
        app: ['src/app/**/*.html'],
        //common: ['src/app/common/**/*.html']
      },
      //less: ['src/less/stylesheet.less'], // recess:build doesn't accept ** in its file patterns
      //lessWatch: ['src/less/**/*.less']
    },


    // --- Task configuration.
    mkdir: {
      all: {
        options: {
          create: ['<%= distdir %>'],
        }
      }
    },
    clean: {
      dist: ['<%= distdir %>/*'],
      lib:  ['lib/*'],
    },
    copy: {
      // Index.html
      app: {
        files: [{
          dest: '<%= distdir %>/index.html',
          src : '<%= src.html %>',
        }]
      },
      // Assets
      assets: {
        files: [{
          dest: '<%= distdir %>',
          src : '**',
          expand: true,
          cwd: 'src/assets/'
        }]
      }
    },
    bower: {
      install: {
        options: {
          targetDir: 'lib',
          //,bowerOptions: {}
        }
      }
    },
    /*
    injector: {
      options: {
        //min: true;
      },
      local_dependencies: {
        files: [{
            dest: '<%= dist.html %>',
            src: ['***.js', '***.css'],
          }]
      },
      bower_dependencies: {
        options: {
        },
        files: [{
          expand: true,
          //cwd: '/',
          dest: '<%= dist.html %>',
          src: ['bower.json'],
        }]
      }
    },
    wiredep: {
      app: {
        src: '<%= dist.dir %>/index.html',
        directory: '<%= dist.lib %>',
      }
    },
    */
    html2js: {
      app: {
        options: {
          base: 'src/app',
          singleModule: true,
        },
        src: ['<%= src.tpl.app %>'],
        dest: '<%= dist.dir %>/templates-app.js',
        module: 'templates.app'
      },
      /*
      common: {
        options: {
          base: 'src/common',
        },
        src: ['<%= src.tpl.common %>'],
        dest: '<%= distdir %>/templates-common.js',
        module: 'templates.common'
      },
      */
    },
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true
      },
      app: {
        files: {
          'dist/app.js': ['src/**/*.js'],
          'dist/app.css': ['src/**/*.css'],
        }
      },
      vendor: {
        files: {
          'dist/angular.js': ['lib/angular/*.js'],
          'dist/jquery.js': ['lib/jquery/*.js'],
          'dist/vendor.js': ['lib/**/*.js', '!lib/bootstrap/*.js', '!lib/angular/*.js', '!lib/jquery/*.js'],
          'dist/vendor.css': ['lib/**/*.css'],
        },
      }
    },
    ngAnnotate: {
      options: {
        singleQuotes: true,
      },
      all: {
        files: {
          // The same file will be replaced by annotated version
          '<%= dist.app %>' : ['<%= dist.app %>'],
        }
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      app: {
        src: '<%= concat.app.dest %>',
        dest: 'dist/app.min.js'
      },
      vendor: {
        src: '<%= concat.vendor.dest %>',
        dest: 'dist/app.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },

      gruntfile: {
        src: 'Gruntfile.js'
      }
      //lib_test: {
      //  src: ['lib/**/*.js', 'test/**/*.js']
      //}
    },
    //qunit: {
    //  files: ['test/**/*.html']
    //},

    express: {
      all: {
        options: {
          port: 9000,
          hostname: "localhost",
          bases: ['<%= dist.dir %>'],
          livereload: true,
        }
      }
    },

    // grunt-open will open your browser at the project's URL
    open: {
      all: {
        // Gets the port from the connect configuration
        path: 'http://localhost:<%= express.all.options.port%>'
      }
    },

    // Watch files for changes and reload browser
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile', 'build']
      },
      src: {
        files: 'src//**/*',
        tasks: ['build'],
        options: {
          livereload: true
        }
      }
      //lib_test: {
      //  files: '<%= jshint.lib_test.src %>',
      //  tasks: ['jshint:lib_test', 'qunit']
      //}
    }
  });

  // These plugins provide necessary tasks.

  grunt.loadNpmTasks('grunt-mkdir');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-bower-task');
  //grunt.loadNpmTasks('grunt-wiredep');
  //grunt.loadNpmTasks('grunt-injector');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-browserify-bower');

};
