const Nightmare = require("nightmare");
const cheerio 	= require('cheerio');
const vo 		= require('vo');
const fs 		= require('fs');

var url = 'https://www.pornhub.com/view_video.php?viewkey=ph56a92b1e91326';
var url2 = "https://xhamster.com/videos/whitney-wright-loves-dildo-anal-masturbation-8833675";

module.exports = function getLink(url) {
	var nightmare = Nightmare({
	    'ignore-certificate-errors': true,
		show: true,
	});
	console.log('start');
	Promise.resolve(nightmare.goto(url)
	    .viewport(1000, 1000)
		.wait(2000)
		.evaluate(function(){
			if( url.search(/pornhub\.com/i) )
				return document.querySelector('#player video source').src;
			if( url.search(/xhamster\.com/i) )
				return document.querySelector('a.player-container__no-player.xplayer').href;
		})
		.end()
		.then(function(link){
			console.log(link);
			writeDown(link, 'ph_pull.txt');
		});
	);
}
function writeDown(data, filename){
	fs.writeFile(filename, data, function(err){
		if(err) return console.log(err);
		console.log('done writing');
	})
}


// yield Nightmare({
//         waitTimeout: 500,
//         'ignore-certificate-errors': true
//     })
//     .goto(url)
//     .wait(selector)
//     .evaluate((selector) => (
//         new Promise((resolve, reject) => {
//             setTimeout(() => resolve(document.querySelector(selector).innerText), 2000);
//         }), selector))
//     // .type('input[title="Search"]', 'github nightmare')
//     // .click('.searchsubmit')
//     .catch(function(error) {
//         console.error('Authorization failed:', error);
//     });


// module.exports = function checkFacebook(callback) {
 //    Promise.resolve(nightmare
 //        .viewport(1000, 1000)
 //        .goto(url)
 //        .wait(2000)
 //    //         .then(()=>{
	// 			// log.step(1);
 //    //         })
            
 //    //         .then(()=>{
	// 			// log.step(1);
 //    //         })
            
 //    //         .then(()=>{
	// 			// log.step(1);
 //    //         })
 //            // .wait(selector)
 //    //         .then(()=>{
	// 			// log.step(1);
 //    //         })
	// 		.evaluate((selector) => {
	// 			console.log('evaluate');
	// 	        new Promise((resolve, reject) => {
	// 	                setTimeout(() => resolve(document.querySelector(selector).innerText), 2000);
	// 	        }, selector)
	// 		})
	// 	    .then((text) => {
	// 	        console.log(text);
	// 	        log.step(1);
	// 	    })
 //            // .evaluate(function() {
 //            //     console.log("evaluate");
 //            //     // document.querySelector('input[id="email"]').value = facebookEmail
 //            //     // document.querySelector('input[id="pass"]').value = facebookPwd
 //            //     let video = document.querySelector("#player video").value;
 //            //     let link = document.querySelector("#player video source");

 //            //     console.log(video);
 //            //     console.log(link);
 //            //     return true
 //            // })
 //            .catch(function(error) {
	// 	        console.error('Authorization failed:', error);
	// 	    })
	// );

//             .click('#loginbutton input')
//             .wait(1000)
//             .goto('https://www.facebook.com/groups/bierconomia')
//             .evaluate(function() {
//                 var posts = document.getElementsByClassName('_1dwg')
//                 var length = posts.length
//                 var postsContent = []
//                 for (var i = 0; i < length; i++) {
//                     var pTag = posts[i].getElementsByTagName('p')
//                     postsContent.push({
//                         content: pTag[0] ? pTag[0].innerText : '',
//                         productLink: posts[i].querySelector('a[rel = "nofollow"]') ? posts[i].querySelector('a[rel = "nofollow"]').href : '',
//                         photo: posts[i].getElementsByClassName('_46-i img')[0] ? posts[i].getElementsByClassName('_46-i img')[0].src : ''
//                     })
//                 }
//                 return postsContent
//             }))
//         .then(function(results) {
//             log(results)
//             return new Promise(function(resolve, reject) {
//                 var leanLinks = results.map(function(result) {
//                     return {
//                         post: {
//                             content: result.content,
//                             productLink: extractLinkFromFb(result.productLink),
//                             photo: result.photo
//                         }
//                     }
//                 })
//                 resolve(leanLinks)
//             })
//         })
// }