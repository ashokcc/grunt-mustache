[build-mustache](https://github.com/sellside/build-mustache)
================


Build static HTML from mustache templates. Great for documentation, gh-pages and simple projects.


## Getting Started
 * Install the module with: `npm install build-mustache`
 * ```npm install``` the dependencies listed below in the README
 * Build with ```grunt```, or on windows ```grunt.cmd```


## Building Mustache to HTML with gruntjs

+ **dependencies**
This grunt system depends on you having grunt, grunt-contrib and hogan.js installed in the node_modules folder in your project. To install, just run the following commands in npm:

```
$ npm install grunt grunt-contrib grunt-recess recess hogan uglify-js jshint
```
Some packages can be installed with `-g`, but you'll want to test those yourself since support for global installation differs by version with some packages.

+ **build** - `grunt`, or on windows `grunt.cmd`
Runs the gruntfile to compile with recess, rebuilding the `/less` files, and compiles the docs pages with hogan.js.

+ **watch** - `grunt watch`, or on windows `grunt.cmd watch`
This is a convenience method for watching mustache files and automatically building them when you save. You can customize this task to watch and compile, test, build etc. any files in your project.


## Documentation
_(Coming soon)_


## Examples
_(Coming soon)_


## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [grunt](https://github.com/gruntjs/grunt).


## Author

 * Jon Schlinkert [@jonschlinkert](http://twitter.com/jonschlinkert)


## Release History
_(Nothing yet)_


## License
Copyright (c) 2012 Jon Schlinkert
Licensed under the MIT license.
