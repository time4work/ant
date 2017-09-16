
"use strict"
var prefix  = 'https://www.youporn.com';
var URL     = 'https://www.youporn.com/most_viewed/';
var fname   = 'youporn.json';
//___________________________
var fs      = require('fs');
var log     = require('cllc')();
var needle  = require('needle');
var tress   = require('tress');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var results = [];
var options = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 0,
    rejectUnauthorized : true 
};
var save    = function(){ 
	fs.writeFileSync('results/'+fname, JSON.stringify(results, null, 4));
}
var q 		= tress(crawl);
q.drain 	= function(){
    save();
}


log.start('Найдено текстов %s, Найдено ошибок %s, Cтраница %s');
log.step(0,0,1);

needle.get(prefix, function(err, res){
    if (err || res.statusCode !== 200)
        throw err || res.statusCode;
    options.cookies = res.cookies;
    q.push(URL);
});

function crawl(url, callback){
    needle.get(url, options, function(err, res){
        // console.log(res.statusCode);
        // console.log(res.body);
        if (err || res.statusCode !== 200){
			log.e((err || res.statusCode) + ' - ' + url);
			log.step(0, 1);
			return callback(err); 
        }
        else{
	        var $ = cheerio.load(res.body);

	        $('div.watchVideo.watchContent').each(function() {
	            results.push({
	                title: $('.watchVideoTitle h1').text(),
	                desc: $('#description').text(),
	                href: url,
	                video: $('#videoContainer video source').attr('src'),
	                tags:  $( ".tagsSuggest a" )
			            .map(function() {
			            return $(this).text();
			            })
			            .get()
			            .join(' ')
	            });
            	log.step();
	            log('@PUSH');
	        });

	        $('div:not(#relatedVideos)>.row > div.video-box > a.video-box-image').each(function() {
	        	log($(this).attr('href'));
	            q.push(prefix + $(this).attr('href'));
	            log('.');
	        });

	        $('#pagination.row div.paginationWrapper #next .prev-next a').each(function() {
	        	var link = resolve(URL, $(this).attr('href') );
	        	if( link.indexOf('javascript') == -1 ){
		            q.push( link );
		            log(' >>> page added');
		            log.step(0,0, 1);
	        	}
	        });
	        callback();
        }

    });
}


