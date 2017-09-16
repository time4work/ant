var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');
var options = {};
var URL     = 'https://www.youporn.com/watch/13933383/german-mom-help-big-dick-18yr-old-step-son-with-fist-fuck/';
var prefix  = 'https://www.youporn.com';
needle.get(prefix, function(err, res){

    if (err || res.statusCode !== 200)
        throw err || res.statusCode;
    // устанавливаем куки
    options.cookies = res.cookies;
    // Запускаем краулинг
    q.push(URL);
});

var q = tress(function(url, callback){
    needle.get(url, options, function(err, res){
        if (err) throw err;

        setTimeout(function(){}, 1000);   

        console.log(res.body);
        // console.log(res.statusCode);

        var $ = cheerio.load(res.body);
        // go();

        $(function(){console.log('ready')});
        // var tags = $('.tagsSuggest a').map(function(){
        //        return $.trim($(this).text());
        //     }).get();
        var tags = $( ".tagsSuggest a" )
            .map(function() {
            return $(this).text();
            })
            .get()
            .join(' ');
        console.log(tags);


        callback();
    });
});
// q.push(URL);
