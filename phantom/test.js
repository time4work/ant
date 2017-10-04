var page = require('webpage').create(),
  system = require('system'),
  t,
  address,
  title;

if (system.args.length === 1) {
  console.log('Usage: loadspeed.js <some URL>');
  phantom.exit();
}

t = Date.now();
address = system.args[1];

page.open(address, function(status) {
  if (status !== 'success') {
    console.log('FAIL to load the address');
  } else {
    t = Date.now() - t;
    // title = page.evaluate(()=>{return document.title;});
    title = page.evaluate(function() {
      console.log("sad so sad");
      return document.title;
    });
    console.log('Loading ' + system.args[1]);
    console.log('Loading time ' + t + ' msec');
    console.log('Page title is ' + title);
  }
  phantom.exit();
});
page.onConsoleMessage = function(msg) {
  console.log('ConsoleMessage is: ' + msg);
};
page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.onResourceReceived = function(response) {
  console.log('Receive ' + JSON.stringify(response, undefined, 4));
};