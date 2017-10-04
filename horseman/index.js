var Horseman = require('node-horseman');
var email    = 'm2.onevegas@gmail.com';
var password = 'hard2pass';
var startURL = 'https://www.mycase.com/';
var tableURL = 'https://mainfish.mycase.com/reporting/accounts_receivable#';
var horseman = new Horseman({
    phantomOptions: {
        'ignore-ssl-errors': true,
        'load-images': true,
        'ssl-protocol': 'any',
    },
    timeout: 10000,
    interval: 200
});
// var startURL = 'https://auth.mycase.com/login_sessions/new?client_id=tCEM8hNY7GaC2c8P&response_type=code';

  horseman
    // .viewport(3200,1800)
    .userAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.84 Safari/537.36')
    .open(startURL)
    .text('.hp-text-original p')
    .then((title)=>{
        console.log(title);
    })
    .click('#navigation a.cta-login')
    .then(()=>{
        console.log(' < - > click');
    })
    .waitForNextPage()
    .then(()=>{
        console.log(' < - > w8');
    })
    .type('#login_session_email', email)
    .type('#login_session_password', password)
    .then(()=>{
        console.log(' < - > form loging');
    })
    .click('#login-button>input')
    .then(()=>{
        console.log(' < - > click');
    })
    .waitForNextPage()
    .then(()=>{
        console.log(' < - > we in');
    })
    // .screenshot('big.png')

    // .cookies()
    // .then((cookies)=>{
    //     console.log(cookies);
    //     work(cookies);
    // })
    .open(tableURL)
    .on('resourceReceived', (response)=>{
        console.log(response);
    })
    .click('#run_report_button')
    .then(()=>{
        console.log(' < - > click');
    })
    .on('resourceReceived', (response)=>{
        console.log(response);
    })
    // .waitForSelector('div.g')
    // .then(()=>{
    //     console.log('w8');
    // })

    // .html('body')

    // .do(function(done){
    //     setTimeout(done,1000);
    // })
    // .log()
    .close();