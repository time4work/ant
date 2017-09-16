"use strict"

// var URL     = process.argv[2];
// var fname   = 'x-art.json';
// var express = require('express');
// var app     = express();
var URL     = 'https://www.x-art.com/videos/';
var fname   = 'x-art.txt';
//___________________________
var fs      = require('fs');
var log     = require('cllc')();
var needle  = require('needle');
var tress   = require('tress');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var results = [];
var save    = function(){ //write it down
	var res_text = '';
	results.forEach(function(item, i, arr){
		res_text += item + '\n';
	});
    fs.writeFileSync('results/'+fname, res_text);
    // log.stop();
    // fs.writeFileSync('./'+fname, JSON.stringify(results, null, 4));
}
// needle.defaults({ open_timeout: 60000 });
log.start('Найдено текстов %s, Найдено ошибок %s');

var q       = tress(function(url, callback){
    needle.get(url, {"timeout":0, "connection": 'Keep-Alive'}, function(err, res){
        // console.log(res.body);
        if (err || res.statusCode !== 200){
			log.e((err || res.statusCode) + ' - ' + url);
			log.step(0, 1);
			return callback(err); 
			// return callback(false); //добавить в конец очередь
        	// throw err || res.statusCode;
        }
        else{
	        var $ = cheerio.load(res.body);
			if($('.info')){
	            var obj = $('.info p');
	            if( obj ){
	                var val = obj.text();

	                if( val.length > 10 ){
	                	log(val);
	                	results.push( val );
	                	log.step();
	                }
	            }
	        };

	        $('ul#allvideos li>a').each(function() {
	            q.push($(this).attr('href'));
	            log('.');
	        });

	        $('ul.pagination>li:last-child a').each(function() {
	        	var link = resolve(URL, $(this).attr('href') );
	        	if( link.indexOf('javascript') == -1 ){
		            q.push( link );
		            log('...');
	        	}
	        });

	        callback();
        }

    });
}, 10);

// q.retry = function(){ //pause
//     q.pause();
//     // this - retry task
//     log.i('Paused on:', this);
//     setTimeout(function(){
//         q.resume();
//         log.i('Resumed');
//     }, 300000); // 5 min
// }

q.drain = function(){ //write it down
    save();
    log.finish();
}

q.push(URL);


// var server = app.listen('8081'); //server
// console.log('Magic happens on port 8081');
// exports = module.exports = app;
