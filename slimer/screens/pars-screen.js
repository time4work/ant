'use strict';
var webpage = require('webpage');
var system = require('system');

// var numberOfArg = system.args.length;
// var site = 'google.com'; 
var site = system.args[1];
console.log('->slimer:'+site);
var prefix = 'http://';

var app = webpage.create();
// var app = process.env.webpage.create();
app
  .open(prefix+site)
  .then(function () {
    // store a screenshot of the page
    app.viewportSize = { width: 650, height: 320 };
    app.render(site+'.png',{ onlyViewport: true });
    slimer.exit();
  });
