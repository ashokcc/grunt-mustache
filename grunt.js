/*global module:false*/

module.exports = function(grunt) {

  'use strict';

  // Project configuration
  grunt.initConfig({

    // Build HTML docs from .mustache files
    mustache: {
      pages: {
        src: 'examples/mustache/pages/*.mustache',
        dest: 'examples/html/FILE.html',
        options: {
          production: false,                            // Production filter renders markup inside {{#production}} tags
          title: 'Grunt-Mustache',                      // Customize "Title" for your project
          layout: 'examples/mustache/layout.mustache',  // Wrap layout around docs pages and convert to HTML
          paths: {
            partials: 'examples/mustache/partials/*.mustache' // Mustache partials that may be used in pages
          }
        }
      }
    },
    watch: {
      mustache: {
        files: ['examples/**/*.mustache'],
        tasks: 'mustache'
      }
    }

  });

  // Load npm tasks first.
  grunt.loadNpmTasks('grunt-contrib');

  // Load local tasks.
  grunt.loadTasks('tasks');

  // Default task. run "grunt" on mac/linux or "grunt.cmd" on windows
  grunt.registerTask('default', 'mustache');

};
