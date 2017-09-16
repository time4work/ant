
"use strict"
var prefix  = 'http://letfap.com/';
var URL     = 'http://letfap.com/movie?sort=published&page=1&ajax=1';
var fname   = 'letfap.json';
//___________________________
var fs      = require('fs');
var log     = require('cllc')();
var needle  = require('needle');
var tress   = require('tress');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var results = [];
var tmpurl 	= '';
var options = {
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    timeout: 0,
    rejectUnauthorized : true  // verify SSL certificate
};

log.start('Найдено материала %s, Найдено ошибок %s, Cтраница %s');

var q = tress(function(url, callback){
    needle.get(url, {"timeout":0}, function(err, res){
        // console.log(res.statusCode);
        // console.log(res.body);
        
        if (err || res.statusCode !== 200){
        	log(' + error ' + url);
        	log(err || res.statusCode);
        	log.step(0,1);
        	return callback(false);
        }
        else{
	        var $ = cheerio.load(res.body);
		    log(' - PUSH data ' + url);
		    var video = $('video#player  source')[0] ? $('video#player  source')[0]['attribs']['src'] : '';
            results.push({
		        title: $('.movie-detail h1').text(),
		        desc: $('.movie-detail .long-text').text(),
		        href: url,
		        video: video,
		        tags:  $( ".movie-detail ul.links a" )
		            .map(function() {
		            return $(this).text();
		            })
		            .get()
		            .join(',')
		    });
			log.step();
			log(' + ');
		    
	        callback();
        }

    });
}, 10);
var q2 = tress(function(url, callback){
    needle.get(url, {"timeout":0}, function(err, res){
        // console.log(res.statusCode);
        // console.log(res.body);
        
        if (err || res.statusCode !== 200){
        	log(' + error ' + url);	
        	log(err || res.statusCode);
        	log.step(0,1);
        	return callback(false);
        }
        else{
        	log.step(0,0,1);
	        var pack = (res.body);
        	var movies = pack.movies;
        	for(var i=0; i<movies.length; i++){
        		log(' = LINK add ' + prefix + movies[i]['url']);
        		q.push( prefix + movies[i]['url'] );
        	}
        }
		if(pack.page < pack.total_page){
			tmpurl = prefix + pack.next_page_url + '&ajax=1' ;
		}
		else{
			tmpurl = 0;
			log('finish');
		}
		callback();
    });
});

q2.push( URL );
var save = function(){ 
    require('fs').writeFileSync('results/'+fname, JSON.stringify(results, null, 4));
}
q.drain = function(){
    if(tmpurl){
    	log(' | PAGE ' + tmpurl);
    	q2.push(tmpurl)
    }
    save();
}
q2.drain = function(){
}
