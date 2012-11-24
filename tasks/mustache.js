/*
 * build-bootstrap
 * https://github.com/jonschlinkert/build-bootstrap
 *
 * Copyright (c) 2012 Jon Schlinkert
 * Credit: inspired by @ctalkington
 * Licensed under the MIT license.
 */

module.exports = function(grunt) {

  // Grunt utilities.
  var task   = grunt.task,
    file     = grunt.file,
    utils    = grunt.util,
    log      = grunt.log,
    verbose  = grunt.verbose,
    fail     = grunt.fail,
    option   = grunt.option,
    config   = grunt.config,
    template = grunt.template,
    _        = utils._;

  // external dependencies
  var fs     = require('fs'),
      hogan  = require('hogan');


  // Please see the grunt documentation for more information regarding task and
  // helper creation: https://github.com/gruntjs/grunt/blob/master/docs/toc.md

  // ==========================================================================
  // TASKS
  // ==========================================================================
  grunt.registerMultiTask('mustache', 'Compile mustache files to HTML with hogan.js', function() {

    var data     = this.data,
        src      = grunt.file.expandFiles(this.file.src),
        dest     = grunt.template.process(data.dest),

      // Options are set in gruntfile
      defaults   = {
        production: false,
        docs: false,
        title: 'Awesome Site',
        layout: 'docs/templates/layout.mustache'
      },
      options = _.extend(defaults, this.data.options || {});

      !src && grunt.warn('Missing src property.')
      if(!src) return false;

      !dest && grunt.warn('Missing dest property')
      if(!dest) return false;

    var done     = this.async();
    var srcFiles = file.expandFiles(src);

    try {
      options.layout = fs.readFileSync(options.layout, 'utf8')
      options.layout = hogan.compile(options.layout, {
        sectionTags: [{
          o: '_i',
          c: 'i'
        }]
      })
    } catch(err) {
      grunt.warn(err) && done(false)
      return
    };

    // options.componentPartials = {};
    // componentsFiles.forEach(function(filepath) {
    //   var filename = _.first(filepath.match(/[^\\\/:*?"<>|\r\n]+$/i)).replace(/\.mustache$/, '')

    //   options.componentsFiles[filename] = hogan.compile(filepath, {});
    // });


    srcFiles.forEach(function(filepath) {
      var filename = _.first(filepath.match(/[^\\\/:*?"<>|\r\n]+$/i)).replace(/\.mustache$/, '')

      grunt.helper('hogan', filepath, filename, options, function(err, result) {
        err && grunt.warn(err) && done(false)
        if(err) return

        file.write(dest.replace('FILE', filename), result)
      })
    })

    done();
  });

  // ==========================================================================
  // HELPERS
  // ==========================================================================
  grunt.registerHelper('hogan', function(src, filename, options, callback) {
    log.writeln('Compiling ' + filename.magenta);

    var page                = fs.readFileSync(src, 'utf8'),
        html                = null,
        layout              = options.layout,
        context             = {};

        context[filename]   = 'active';
        context._i          = true;
        context.production  = options.production;
        context.docs        = options.docs;

    var title               = _.template("<%= page == 'Index' ? site : page + ' · ' + site %>")
    context.title           = title({
      page: _(filename).humanize().replace('css', 'CSS'),
      site: options.title
    });
    try {

      // options.componentPartials.sectionTags = [{o: '_i',c: 'i'}];
      /****
      componentPartials = {
        assets: assets,
        animations: animations,
        banners: banners
      };
      ****/
      // page = hogan.compile(page, options.componentPartials);

      page = hogan.compile(page, {
        sectionTags: [{
          o: '_i',
          c: 'i'
        }]
      })
      page = layout.render(context, {
        body: page
      })
      callback(null, page)
    } catch(err) {
      callback(err)
      return
    };
  });
};
