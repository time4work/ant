var fs = require('fs');
var file     = process.argv[2];

fs.readFile('./'+file,{encoding: 'utf8'},function(err,data) {
  var d = JSON.parse(data);
  console.log(d.length);
  // fs.writeFile('./names.json',string,function(err) {
  //   if(err) return console.error(err);
  //   console.log('done');
  // })  
})