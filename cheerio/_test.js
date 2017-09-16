var tress = require('tress');
var needle = require('needle');
var cheerio = require('cheerio');
var resolve = require('url').resolve;
var fs = require('fs');
// var iconv   = require('iconv-lite');  //Substitution (needle)
// var request = require('request'); 
// var opt  = {  
//     url: 'https://www.x-art.com/galleries/definitely_not_so_shycum_see/',
//     encoding: null
// }
// app.get('/', function(req, res){  
//     res.send('hello world');
//     request(opt, function(error, response, html){
//         if (error) throw error;
//     console.log(iconv.decode(html, 'utf8'));
//     console.log(response.statusCode);
//     })
// });

// needle.get(url, function(err, res){
//     if (err) throw err;
//     console.log(res.body);
//     console.log(res.statusCode);
// });
var URL     = 'https://www.youporn.com/watch/13523189/great-sex-with-fiancee-add-my-snapchat-emmalanes/';
//var URL = 'https://www.x-art.com/galleries/definitely_not_so_shycum_see/';
// var URL = 'https://www.x-art.com/index.php?show=galleries&pref=items&page=%s&catname=all&order=recent';
// var URL     = 'https://www.x-art.com/videos/born_to_be_wild/';
var fname   = 'test.json';
var results = [];
var body = '';
var save    = function(){ //write it down
    var res_text = '';
    results.forEach(function(item, i, arr){
        res_text += item;
    });
    // fs.writeFileSync('./'+fname, res_text);
    fs.writeFileSync('./'+fname, body);
    // log.stop();
    // fs.writeFileSync('./'+fname, JSON.stringify(results, null, 4));
}
var q = tress(function(url, callback){
    needle.get(url, function(err, res){
        if (err) throw err;

        console.log(res.body);
        console.log(res.statusCode);
body = res.body;
        // var $ = cheerio.load(res.body);
        // if($('.info-wrapper')){
        //     console.log('.');

        //     var obj = $('.info-wrapper .large-6.columns.info p');
        //     if( obj ){
        //         var val = obj.text();
        //         console.log(val);
        //         console.log('...');
        //     }
        // };
        // console.log(res.body);
        // console.log(res.statusCode);

        var $ = cheerio.load(res.body);
        var video = $('#videoContainer video source').attr('src')
        console.log(video);

            // if($('.info')){
            //     var obj = $('.info p');
            //     if( obj ){
            //         var val = obj.text();

            //         if( val.length > 10 ){
            //             results.push( val );
            //         }
            //     }
            // };

            // var obj = $('#desc p');
            // if( obj ){
            //     console.log(obj);
            //     var val = obj.text();
            //     console.log(val);
            //     console.log('..');
            // }

            // var obj = $('.info-wrapper .large-6.columns.info p');
            // if( obj ){
            //     var val = obj.text();
            //     console.log(val);
            //     console.log('...');
            // }

        callback();
    });
});
//}, 10); // запускаем 10 параллельных потоков
q.drain = function(){ //write it down
    save();
}
q.push(URL);
