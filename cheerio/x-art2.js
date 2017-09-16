"use strict"

var URL     = 'https://www.x-art.com/index.php?show=galleries&pref=items&page=%s&catname=all&order=recent';
var fname   = 'x-art2.json';

var fs      = require('fs');
var needle  = require('needle');
var tress   = require('tress');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var results = [];
var iterator= 1;

var save = function(){ 
    require('fs').writeFileSync('results/'+fname, JSON.stringify(results, null, 4));
}
var q = tress(function(url, callback){
    needle.get(url, {"timeout":0}, function(err, res){
        // console.log(res.statusCode);
        // console.log(res.body);
        if (err || res.statusCode !== 200){
        	throw err || res.statusCode;
        }
        else{
	        var $ = cheerio.load(res.body);
			if($('.info')){
	            var obj = $('.info p');
	            if( obj ){
	                var val = obj.text();

	                if( val.length > 10 ){
	                	console.log(val);
	                	results.push( val );
	                	console.log('+');
	                }
	            }
	        };
	        callback();
        }

    });
}, 10);
var q2 = tress(function(url, callback){
    needle.get(url, {"timeout":0}, function(err, res){
        // console.log(res.statusCode);
        // console.log(res.body);
        var pack = JSON.parse(res.body);
        var htmp = pack.html;
        iterator = pack.next;
		if(iterator != -1)
			q2.push( URL.replace('%s', iterator) );
        if (err || res.statusCode !== 200){
        	throw err || res.statusCode;
        }
        else{
	        var $ = cheerio.load(htmp);

	        $('li>a').each(function() {
	            q.push($(this).attr('href'));
	            console.log('.');
	        });
	        callback();
        }

    });
}, 10);

q2.push( URL.replace('%s', iterator) );
q.drain = function(){
    save();
}


