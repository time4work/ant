'use strict';
var webpage = require('webpage');
var system = require('system');
// var site = system.args[1];
var site = 'www.x-art.com/galleries/definitely_not_so_shycum_see';
console.log('->slimer:'+site);
var prefix = 'https://';

var app = webpage.create();
app
  .open(prefix+site)
  .then(function () {

    // slimer.wait(3000);

	var p = app.evaluate(function () { 
		return document.querySelector("div.info p:not(#desc)").textContent;
  });

	console.log(p);

    // for(var i=0; i<list.length; i++){
    // 	console.log(list[i]);
    // }

	// var someContent = this.evaluate(function () { // после того как динамический контент подгружен, можно его спарсить
	// 	return document.querySelector("#aDiv").textContent;
 //    });

    // this.evaluate(function(){
    // 	$("#signIn").click();
    // });

    slimer.exit();
  });