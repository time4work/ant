
"use strict"

var prefix  = 'http://javhihi.com/';
var URL     = 'http://javhihi.com/movie/dirty-japanese-group-sex-with-horny-shiori-ayase.2988.html';
var fs      = require('fs');
var needle  = require('needle');
var tress   = require('tress');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var q 		= tress(crawl);
var options = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 0,
    rejectUnauthorized : true  // verify SSL certificate
};
needle.get(prefix,{timeout: 0}, function(err, res){
    if (err || res.statusCode !== 200)
        throw err || res.statusCode;
    else{
	    options.cookies = res.cookies;
    	q.push(URL);
    }
});
function crawl(url, callback){
    needle.get(url, options, function(err, res){
        // console.log(res.statusCode);
        console.log(res.body);
        if (err || res.statusCode !== 200){
        	throw err || res.statusCode;
        }
        else{
        	console.log('@');
	        var $ = cheerio.load(res.body);
            // var obj = $('video#player source')[0].getAttribute('src');
            // var obj = $('video#player  source')[0].attr('src');
            var obj = $('video#player  source')[0];
            // var obj = $('#player video source').src();
        	console.log(obj['attribs']['src']);

	        
	        callback();
        }

    });
}
// q.push( URL );

