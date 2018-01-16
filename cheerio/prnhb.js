
"use strict"

const prefix  = 'https://www.pornhub.com';
const URL     = 'https://www.pornhub.com/video?page=0';
const fname   = 'prnhb.json';
//___________________________
const fs      = require('fs');
const log     = require('cllc')();
const needle  = require('needle');
const tress   = require('tress');
const cheerio = require('cheerio');
const nightmare = require("nightmare");
const resolve = require('url').resolve;

var results = [];
var details = [];
var options = {
    headers: {
	   "Accept": "*/*",
	   "Connection": "keep-alive",
	   "User-Agent":"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/34.0.1847.132 Safari/537.36"
    },
    timeout: 0,
    rejectUnauthorized : true 
};

var save = function(data, fname){ 
	fs.writeFileSync('results/'+fname, data);
}

var chain2 = tress(crawlData);
chain2.drain = function(){
    save(JSON.stringify(results, null, 4), fname);
}

var chain = tress(crawlPages);
chain.drain = function(){
    // save(JSON.stringify(results, null, 4), fname);
    chain2.push(details, function (err) {
	    console.log('finished processing item');
		console.log();
	}); 
}


log.start('Найдено данных %s, Найдено ошибок %s, Cтраница %s');
log.step(0,0,1);

needle.get(prefix, function(err, res){
    if (err || res.statusCode !== 200)
        throw err || res.statusCode;
    options.cookies = res.cookies;

    chain.push(URL);
});

async function crawlData(url, callback){
	try {
		nightmare({
	        'ignore-certificate-errors': true,
	        show: true,
	    })
		.goto(url)
	    .viewport(1000, 1000)
	    .wait(2000)
	    .evaluate(function() {
	    	// console.dir("1");
	     //    let title = document.querySelector('h1.title span.inlineFree')[0]
	     //    	.text();
	    	// // log("1");
	     //    let categories = document.querySelector('div.categoriesWrapper a')
	     //    	.map(function() {
	     //        	return $(this).text();
	     //        });
	    	// // log("1");
	     //    let tags = document.querySelector('div.tagsWrapper a')
	     //    	.map(function() {
	     //        	return $(this).text();
	     //        });
	    	// // log("1");

	    	// var data = {
	     //        title: title,
	     //        desc: '',
	     //        href: prefix,
	     //        // video: $('#videoContainer video source').attr('src'),
	     //        video: url,
	     //        tags:  tags.concat(categories)
	     //    };
	    	// console.log(1);
	        // return document.body.innerHTML;
	        return document.body.outerHTML;
	        // return document.body;

	    })
	    .end()
		.then(function(html) {
		    log(" - data - ");
		    // console.log(html);
			var $ = cheerio.load(html);

	        let title = $('h1.title span.inlineFree').text();
	        // log( 'title' );
	        // console.log( title );
	        // console.log();
	        let categories = $('div.categoriesWrapper a')
	        	.map(function() {
	            	return $(this).text();
	            }).get();
	        // log( 'categories' );
	        // console.log( categories );
	        // console.log();
	        let tags = $('div.tagsWrapper a')
	        	.map(function() {
	            	return $(this).text();
	            }).get();
	        // log( 'tags' );
	        // console.log( tags );
	        // console.log();

	    	let data = {
	            title: title,
	            desc: '',
	            href: prefix,
	            // video: $('#videoContainer video source').attr('src'),
	            video: url,
	            tags:  tags.concat(categories)
	        };
		    console.log(data);
		    log(" = data = ");
		    
	        results.push(data);
			log.step();
			callback();
		 //    return new Promise(function(resolve, reject) {
		 //        resolve(data);
			// })
		});
	} catch (e) {
		console.log("nightmare err");
		console.log(e);
		return 0;
	}
	
}
function crawlPages(url, callback){
    needle.get(url, options, function(err, res){
        // console.log(res.statusCode);
        console.log(res.body);
        save(res.body, 'prnhb.html');
        if (err || res.statusCode !== 200){
			log.e((err || res.statusCode) + ' - ' + url);
			log.step(0, 1);
			return callback(err); 
        }
        else{
	        var $ = cheerio.load(res.body);

	        // $('div.watchVideo.watchContent').each(function() {
	        // 	// log.step(1);
	        //     results.push({
	        //         title: $('h1.title span.inlineFree').text(),
	        //         desc: '',
	        //         href: prefix,
	        //         // video: $('#videoContainer video source').attr('src'),
	        //         video: url,
	        //         tags:  $( "div.categoriesWrapper a" ) //categoriesWrapper //tagsWrapper
			      //       .map(function() {
			      //       return $(this).text();
			      //       })
			      //       .get()
			      //       .join(',')
	        //     });
         //    	log.step();
	        //     log('>>> data added');
	        // });

	        $('ul.nf-videos.videos.search-video-thumbs li.videoblock.videoBox span.title a').each(function() {
	        	log($(this).attr('href'));

	        	var link = resolve(URL, $(this).attr('href') );
	        	details.push(link);
	            // chain.push(prefix + $(this).attr('href'));
	            log('>>> detail added');
	        });

	        // $('.pagination3 li.page_next.omega a').each(function() {
	        // 	var link = resolve(URL, $(this).attr('href') );
	        // 	if( link.indexOf('javascript') == -1 ){
		       //      chain.push( link );
		       //      log(' >>> page added');
		       //      log.step(0,0, 1);
	        // 	}
	        // });
	        callback();
        }

    });
}


