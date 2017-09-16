var page = require("webpage").create();
var startTime;
page.onLoadStarted = function () {
    startTime = new Date()
};
page.onLoadFinished = function (status) {
    if (status == "success") {
        var endTime = new Date()
        console.log('The page is loaded in '+ ((endTime - startTime)/1000)+ " seconds" );
    }
    else
        console.log("The loading has failed");
};
page.open('https://www.apple.com/')
.then(function(status){
	if(status == 'success'){
		console.log("The title of the page is: "+ page.title);

		var mainTitle = page.evaluate(function(){
			console.log('msg from the web page');
			return document.querySelector('h1').textContent;
		});
		console.log('First title of the page is ' + mainTitle);
	}else{
		console.log('opps...error');
	}
	page.close();
	phantom.exit();
})